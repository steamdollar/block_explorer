import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { block_request } from '../reducers/blockInfo';
import { tx_request } from "../reducers/txInfo.js";
import { update_request } from "../reducers/update";

const Wrap = styled.div`
    width: 100%;
    height :100%;
    display : flex;
    justify-content: center;
    font-weight: 600;
`

const Imgspan = styled.span`
    width: 3.5rem;
    height : 3.5rem;
    margin: 0.5rem;
    display: inline-block;
    text-align : center;
    line-height: 3.5rem;
    border-radius: 5px;
    background-color: #eeeeee;
    font-weight: 600;
    font-size : 1.125rem;
`

const InfoContainer = styled.div`

    width: 40%;
    margin: 1rem 1rem 0 1rem;
    
    > .title {
        font-size : 2rem;
        text-align : center;
        margin: 0;
        border-bottom : 1px solid #aaaaaa;
    }
    
    > table > tr 
        
        > .Info {
            display : flex;
            justify-content: space-around;
            align-items: center;
            padding : 0.5rem 1rem 0.5rem 1rem;
            width: 90%;
            
            border-bottom : 1px solid #aaaaaa;

            > .numbers {
                font-size : 0.75rem;
                width: 7rem;
                height: 2rem;
                line-height: 0.625rem;

                > .bk_num {
                    margin: 0 0 0.25rem 0;
                }

                > div {
                    height : 0.3rem;
                }

                > .bk_time {
                    line-height: 0.7rem;
                }
            }

            > .bk_hash {
                display : inline-block;
                width : 60%;
                font-size: 0.8rem;
                text-overflow : ellipsis !important;
                overflow: hidden;
            }
        }
`;

const InfoContainer2 = styled.div`
    width: 40%;
    margin: 1rem 1rem 0 1rem;
    
    > .title {
        font-size : 2rem;
        text-align : center;
        margin: 0;
        border-bottom : 1px solid #aaaaaa;
    }

    
    > table {
        > tr 
            > .Info {
                border-bottom : 1px solid #aaaaaa;
                padding : 0.5rem 1rem 0.5rem 1rem;
                width: 100%;
                display : flex;
                justify-content: space-between;
                align-items: center;

                > .txhash {
                    width : 12.5rem;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    margin : 0 1.75rem 0 0rem;
                    font-size : 0.75rem;
                    left : 0;
                        
                    > .txHashlink {
                        display: inline;
                        width : 100%;
                    }
                }

                > .p2p {
                    > div {
                        font-size : 0.75rem;
                        display : inline-block;
                        margin : 0 0 0 2rem;
                        padding: 0 0 0 2rem;
                        text-align: end;
                    }
                }
            }
        }
`;


const BlockInfo = () => {
    const blockInfo = useSelector(state => state.block)
    const txInfo = useSelector(state => state.tx)
    const dispatch = useDispatch()


    const getInfo = () => {
        dispatch({ type: block_request.toString() });
        dispatch({ type : tx_request.toString()})
    }
    
    const realtime = () => {
        dispatch({type: update_request.toString()})
        getInfo()
    }

    useEffect(() => {  
        getInfo()
        setInterval ( realtime, 15000)
    },[dispatch])

    return (
        <>
            <Wrap>
                <InfoContainer>
                    <div class='title'>Latest Blocks</div>
                    <table>
                        <tr>
                            {
                                blockInfo.block.map((v,k) => (
                                    <div className='Info'>
                                        <td><Imgspan> Bk </Imgspan></td>
                                        <td class='numbers'>
                                            <span class='bk_num'><Link to={'/viewBlock/' + v.number}>{v.number}</Link></span>
                                            <div></div>                                        
                                            <span class='bk_time'>
                                                { 
                                                    parseInt((Date.now() - v.timestamp*1000)/1000) < 60 ?
                                                    parseInt((Date.now() - v.timestamp*1000)/1000) + ' secs ago..' :
                                                    parseInt((Date.now() - v.timestamp*1000)/1000) < 3600 ?
                                                    Math.floor(parseInt((Date.now() - v.timestamp*1000)/1000)/60) + ' minutes ago..' :
                                                    parseInt((Date.now() - v.timestamp*1000)/1000) < 3600 * 24 ?
                                                    Math.floor(parseInt((Date.now() - v.timestamp*1000)/1000)/3600) + ' hours ago..' :
                                                    parseInt((Date.now() - v.timestamp*1000)/1000) < 3600 * 24 * 7 ?
                                                    Math.floor((parseInt((Date.now() - v.timestamp*1000)/1000)/3600)/24) + ' days ago..' :
                                                    'long time ago...'
                                                } 
                                            </span>
                                        </td>

                                        <td class='bk_hash'>
                                            <Link to={'/viewBlock/' + v.hash}>  {v.hash} </Link>
                                        </td>
                                    </div>
                                ))
                            }
                         </tr>
                    </table>
                </InfoContainer>

                <InfoContainer2>
                    <div class='title'>Latest Transactions</div>
                    <table>
                        <tr>
                        {
                            txInfo.tx.map((v,k) => (
                                <div className='Info'>
                                    <td><Imgspan> Tx </Imgspan></td>

                                    <td className='txhash'>
                                        <Link to= {'/viewTx/' + v.transactionHash} className='txHashlink'> 
                                            {v.transactionHash} 
                                        </Link>
                                    </td>

                                    <td className='p2p'>
                                        <div> 
                                            <span> from : </span> 
                                            <Link to = {'/viewWallet/' + v.sender}> 
                                                {v.sender} 
                                            </Link>
                                        </div>
                                        <div> 
                                            <span> to : </span>  
                                            <Link to = {'/viewWallet/' + v.receiver}> 
                                                {v.receiver} 
                                            </Link>
                                        </div>
                                    </td>
                                </div>
                            ))
                        }
                        </tr>
                    </table>
                </InfoContainer2>
            </Wrap>
        </>
    )
};

export default BlockInfo;
