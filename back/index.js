const express = require('express')
const app = express()
const web3 = require('Web3')
const cookieParser = require('cookie-parser');

const pool = require('./utils/db.js').pool
const cors = require('cors');

const frontend = require('./utils/ip.js')
const bc_network = require('./utils/ip.js')

const source = new web3(new web3.providers.HttpProvider(`http://localhost:9000`))

app.use(cors({
    origin: '*',
    credentials: true,
}));

app.use(cookieParser());

app.get('/blockinfo', async (req,res) => {
    try {
        const sql_getBlock = `select * from block order by number desc limit 10;`
        const [result_block] = await pool.execute(sql_getBlock)
    
        const response = {
            result_block: result_block, // arr
            errno : 0
        }

        res.json(response)
    }
    catch (e) {
        console.log(e.message)
        const response = {
            errno : 1,
            msg : e.message
        }
        res.json(response)
    }
})

app.get('/txinfo', async(req, res) => {
    try {
        const sql_getTx = `select * from tx order by blockNumber limit 10;`
        const [result_tx] = await pool.execute(sql_getTx)
        const response = {
            result_tx : result_tx.reverse(),
            errno : 0
        }

        res.json(response)
    }
    catch (e) {
        console.log(e.message)
        const response = {
            errno : 1,
            msg : e.message
        }
        res.json(response)
    }
})

app.get('/viewBlock/:id', async (req,res) => {
    const {id} = req.params
    const fid = id.split(':')[1]
  
    if( fid.length == 66 ) {
        console.log('hash search')
        const sql_findBlock_hash = `select * from block where hash=?`
        const param = [fid]

        try {
            const [result] = await pool.execute(sql_findBlock_hash, param)
            const response = {
                result : result,
                errno : 0
            }
            res.json(response)
        }
        catch (e) {
            console.log(e.message)
            const response = {
                errno : 1,
                msg : e.message
            }
            res.json(response)
        }

    }
    else {
        const sql_findBlock_height = `select * from block where number=?`
        const param = [fid]
        try {
            const [result] = await pool.execute(sql_findBlock_height, param)

                const response = {
                    result : result,
                    errno : 0
                }
                res.json(response)
            
        }
        catch (e) {
            console.log(e.message)
            const response = {
                errno : 1,
                msg : e.message
            }
            res.json(response)
        }
    }
})

app.get('/viewTx/:txId',  async (req, res) => {
    const {txId} = req.params
    const fid = txId.split(':')[1]

    try {
        const sql_findtx = `select * from tx where transactionHash = ?`
        const param = [fid]

        const [result] = await pool.execute(sql_findtx, param)
        const response = {
            result : result,
            errno : 0
        }
        res.json(response)
    }
    catch (e) {
        console.log(e.message)
        const response = {
            errno : 1,
            msg : e.message
        }
        res.json(response)
    }
})

app.get('/viewWallet/:walletId', async (req, res) => {
    const {walletId} = req.params
    const fid = walletId.split(':')[1]

    try {
        const sql_findWallet = `select * from tx where sender = ? or receiver = ?`
        const param_findWallet = [fid, fid]

        const [result] = await pool.execute(sql_findWallet, param_findWallet)
        
        const response = {
            result : result,
            errno : 0
        }
        res.json(response)
    }

    catch (e) {
        console.log(e.message)
        const response = {
            errno : 1,
            msg : e.message
        }
        res.json(response)
    } 
})

app.get('/viewCoinbase/:walletId', async (req, res) => {
    const {walletId} = req.params
    const fid = walletId.split(':')[1]
    try {
        const sql_findCoinbase = `select number, timestamp, transactionNum, difficulty, gasLimit from block
            where miner = ?`
        const param = [fid]
        let final_result = []
        const [result] = await pool.execute(sql_findCoinbase, param)

        // 지갑 주소로 이 지갑이 만든 블록을 가져온다.

        for ( let i = 0; i < result.length; i++) {
            if(result[i].transactionNum == 0) {
                result[i].compensation = 2
                result[i].totalGasUsed = 0
                result[i].gasUsedPortion = 0
                final_result.push(result[i])
            }
            // 블록이 tx가 없을 경우 보상 = 2 넣고 끝
            else {
                const sql_findtx = `select sum (effectiveGasPrice * gasUsed) as prize from tx where blockNumber = ?`
                const param = [result[i].number]

                const [result_prize] = await pool.execute(sql_findtx, param)
                const prize = parseInt(result_prize[0].prize)

                result[i].totalGasUsed = prize / 10**9
                result[i].gasUsedPortion = Number(((result[i].totalGasUsed / result[i].gasLimit) * 100).toFixed(2))
                result[i].compensation = 2 + prize/10**18
                final_result.push(result[i])    
            }
            // 블록에 tx가 있을 경우 그 블록을 모블록으로 가지는 tx를 가져와 가스비 계산
            // 가스비 * 사용량의 합
        }

        const response = {
            result : final_result.reverse(),
            errno : 0
        }
        res.json(response)
    }

    catch (e) {
        console.log(e.message)
        const response = {
            errno : 1,
            msg : e.message
        }
        res.json(response)
    }
})

app.post('/addBlock', async (req,res) => {
    // db에 새로운 block을 추가할 라우터
    // 블록체인 네트워크와 통신해 새로운 블록체인 데이터를 받아옴
    // 그걸 db에 넣는다.
    let blockchain = []
    const block_number = await source.eth.getBlockNumber()

    // console.log(block_number)

    try {

        for(let i = 1; i<=block_number; i++) {
            const sql_redunduncy = `select number from block where number = ?`
            const param = [i]
            const [ result ] = await pool.execute(sql_redunduncy, param)

            if ( result.length == 0 ) {
                const block = await source.eth.getBlock(i, true)

                const param_addBlock = [
                    block.number, block.difficulty, block.extraData, block.gasLimit, block.gasUsed, block.hash,
                    block.miner, block.mixHash, block.nonce, block.parentHash, block.receiptsRoot, 
                    block.sha3Uncles, block.size, block.stateRoot, block.timestamp, block.totalDifficulty, 
                    block.transactionsRoot, block.transactions.length 
                ]
                

                const sql_addBlock = `insert into block (number, difficulty, extraData, gasLimit, gasUsed, 
                    hash, miner, mixHash, nonce , parentHash, 
                    receiptsRoot, sha3Uncles, size, stateRoot, timestamp, totalDifficulty, transactionsRoot
                    , transactionNum ) 
                    values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`

                const [ result2 ] = await pool.execute(sql_addBlock, param_addBlock)

                if(block.transactions.length !== 0) {
                    for ( let j = 0; j < block.transactions.length; j++) {
                        const txReceipt = await source.eth.getTransactionReceipt(block.transactions[j].hash)

                        const sql_addTx = `insert into tx (transactionIndex, transactionHash, blockHash, blockNumber, 
                            contractAddress, cumulativeGasUsed, effectiveGasPrice, sender, gasUsed, receiver, type)
                            values (?,?,?,?,?,?,?,?,?,?,?)`
                        
                        const param_addTx = [ txReceipt.transactionIndex, txReceipt.transactionHash,
                            txReceipt.blockHash, txReceipt.blockNumber, txReceipt.contractAddress,
                            txReceipt.cumulativeGasUsed, txReceipt.effectiveGasPrice, txReceipt.from,
                            txReceipt.gasUsed, txReceipt.to, txReceipt.type ]

                        const [result3] = await pool.execute(sql_addTx, param_addTx)
                    }
                }
                // 41번 블록에 0x364da54cc609302c91a5497546395eb989a8348ef960a41248f5b75795daa318 tx 존재
                
                blockchain.push(block)
            }
        }
        console.log('blockchain updated')
    }
    catch (e) {
        console.log(e.message)
    }

    res.json(blockchain)
})



app.listen( 4000, () => {
    console.log('back 4000 run')
})

// slice immer