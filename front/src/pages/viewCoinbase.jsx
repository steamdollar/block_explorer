import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { viewCoinbase_request } from "../reducers/viewCoinbase";

const AccountBanner = styled.div`
    width: 80%;
    text-align: center;
    font-size : 1.5rem;
    font-weight: 600;
    margin : 0 auto;
    margin-bottom : 0.75rem;

    > .tx_history {
        font-size : 1rem;
        float : left;
        margin : 0.5rem 0.4rem 0.5rem 0.4rem;
        padding : 0.5rem 0.4rem 0.5rem 0.4rem;
    }

    > .coinbase {
        font-size : 1rem;
        float : left;
        margin: 0.5rem 0.4rem 0.5rem 0.4rem;
        padding : 0.5rem 0.4rem 0.5rem 0.4rem;
    }
`

const Wrap = styled.div`
    width : 100%;
    display : flex;
    justify-content: center;
    > table {
        width : 65%;

        > thead {
            height : 2rem;
            > tr {
                > th {
                    font-size: 1.5rem;
                    
                }
                .number {
                    width : 6rem;
                }
                .age {
                    width : 8rem;
                }
                .transaction {
                    width: 6rem;
                }
                .difficulty {
                    width : 10rem;
                }
                .reward {
                    width: 10rem;
                }
            }
        }

        > .blank {
            height: 1rem;
        }

        > tbody {
            > tr {
                margin: 0.5rem 0 10rem 0;

                > td {
                    text-align: center;
                    > .portion {
                        font-size : 0.25rem;
                        color : #aaaaaa;
                    }
                    > .gasUsed {

                    }
                }
            }
            > .blanker {
                margin: 0 0 1rem 0;
                width: 100%;
            }
        }
    }
`

const ViewCoinBase = () => {
    const dispatch = useDispatch()
    const viewCoinbase = useSelector(state => state.viewCoinbase.viewCoinbase)
    const idx = window.location.href.split('/')[4]
    const [ targetWallet, setTargetWallet] = useState(idx)    

    const getCoinbase = (idx) => {
        dispatch({type : viewCoinbase_request.toString(), payload : {idx : idx}})
    }

    useEffect(()  => {
        getCoinbase(idx)
    }, [dispatch])

    return (
        <>
            <AccountBanner> 
                <div> Account : {targetWallet} </div> 
                <span className='tx_history'><Link to={'/viewwallet/' + targetWallet}> tx history </Link></span>
                <span className='coinbase'>coinbase</span>
            </AccountBanner>
            <Wrap>
                <table>
                    <thead>
                        <tr>
                            <th className='number'> #Block </th>
                            <th className='age'> Age </th>
                            <th className="transaction"> Tx </th>
                            <th className="difficulty"> Difficulty </th>
                            <th className='gasUsed'> GasUsed </th>
                            <th className="reward"> Reward </th>
                        </tr>
                    </thead>
                    <div class='blank'></div>
                    <tbody>
                    {
                        viewCoinbase.map ((v,k) => (
                            <>
                            <tr>
                                <td className='number'>
                                    <Link to={'/viewBlock/' + v.number }>{v.number}</Link>
                                </td>
                                <td className='age'> 
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
                                </td>
                                <td className="transaction"> {v.transactionNum} </td>
                                <td className="difficulty"> {v.difficulty} </td>
                                <td className="gasUsed"> 
                                    {v.totalGasUsed} 
                                    <span class='portion'> ({v.gasUsedPortion} %)</span>
                                </td>
                                <td className="reward"> {v.compensation} Ether </td>
                            </tr>
                            <div class='blanker'></div>
                            </>
                        ))
                    }
                    </tbody>
                </table>
            </Wrap>
        </>
    )
}

export default ViewCoinBase;