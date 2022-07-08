import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { viewBlock_request } from "../reducers/viewBlock";

const Pg_Wrap = styled.div`
    width : 100%;
    display : flex;
    justify-content: center;
`
const Bk_Wrap = styled.div`
    width: 70%;
    margin : 2.25rem 4rem 4rem 4rem;

    > .bk_num {
        display : inline-block;
        font-size: 2rem;
        padding : 0 0 0 9.25rem;
        margin : 0 1rem 1.25rem 0;
    }

    > span > span {
        display: inline-block;
        width : 1.25rem;
        height : 1.25rem;
        font-size: 1.25rem;
        text-align: center;
        line-height: 1.125rem;
        background-color: #1890ff;
        cursor: pointer;
    }

    > span > .left {
        border-right : 1px solid black;
    }

    > li {
        list-style: none;
        padding : 0 2rem 0 4.5rem;
        margin: 1rem 1rem 1.5rem 2rem;
        border-bottom : 1px solid #aaaaaa;
        font-size : 0.875rem;
        font-weight: 600;
        letter-spacing: -0.025rem;
        text-align: left;

        > .meta {
            width: 5rem;
            display: inline-block;
            margin : 0 10rem 1.5rem 3rem;
            font-size: 1.125rem;
            font-weight: 600;
            line-height: 1.125rem;
        }
    }

    >.top_li {
        margin-top: 2rem;
    }
`


const ViewBlock = () => {
    const dispatch = useDispatch()
    const viewBlock = useSelector(state => state.viewblock)
    const idx = window.location.href.split('/')[4]
    const [ presentBlock, setPresentBlock ] = useState(idx)


    const getBlock = (idx) => {dispatch({ type : viewBlock_request.toString(), payload : {idx : idx} })}

    useEffect(()  => {getBlock(idx)}, [dispatch])

    return (
        
        <Pg_Wrap>
          {
            viewBlock.viewblock.map((v,k) => (
            <Bk_Wrap>
                <div className='bk_num'> Block # {v.number} </div>

                <span className='arrow'>
                    <span onClick = { () => getBlock((v.number) - 1) } className='left'>
                        &lt;
                    </span>
                    
                    <span onClick = {() => getBlock((v.number) + 1)}>
                        &gt;
                    </span>
                </span>
                

                    <li> 
                        <span className='meta'>hash </span>  
                        <span>{ v.hash }</span> 
                    </li>
                    <li> <span className='meta'>difficulty </span>  {v.difficulty} </li>
                    <li> <span className='meta'>transaction </span>  {v.transactionNum} tx contained </li>
                    <li> <span className='meta'> timestamp </span> {v.timestamp} </li>
                    <li> <span className='meta'>  extraData </span>  { v.extraData } </li>
                    <li> <span className='meta'> gasLimit </span>  { v.gasLimit } </li>
                    <li> <span className='meta'> gasUsed </span>  { v.gasUsed} </li>
                    <li> <span className='meta'> miner </span>  <Link to = {'/viewWallet/' + v.miner}> {v.miner} </Link> </li>
                    <li> <span className='meta'> mixHash </span>  { v.mixHash} </li>
                    <li> <span className='meta'> nonce </span>  { v.nonce } </li>
                    <li> <span className='meta'> parentHash </span>  
                        <span onClick={() => getBlock(v.parentHash)}>{ v.parentHash }</span> 
                    </li>
                    <li> <span className='meta'> receiptsRoot</span>  { v.receiptsRoot} </li>
                    <li> <span className='meta'> sha3Uncles</span>  { v.sha3Uncles} </li>
                    <li> <span className='meta'> size </span>  { v.size } </li>
                    <li> <span className='meta'> stateRoot </span>  { v.stateRoot} </li>
                    <li> <span className='meta'> totalDifficulty </span>  { v.totalDifficulty} </li>
                    <li> <span className='meta'> transactionsRoot </span>  {v.transactionsRoot } </li>

            </Bk_Wrap>
                
            ))
          }
        </Pg_Wrap>
    )
}

export default ViewBlock;