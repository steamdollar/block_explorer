import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { viewWallet_request } from "../reducers/viewWallet";

const Pg_Wrap = styled.div`
    width : 100%;
    display : flex;
    justify-content: space-evenly;
    flex-direction: column;
    align-items: center;
`

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

const Bk_Wrap = styled.div`
    width: 80%;
    > ul {
        margin : 0 auto;
        border : 1px solid #aaaaaa;
        padding : 0.75rem 7rem 0.75rem 7rem;
        margin-bottom: 1rem;
        overflow: hidden;
        text-overflow: ellipsis;

        > li {
            list-style: none;
            padding : 0.5rem 4rem 0 4rem;
            margin: 0rem 2rem 0rem 1rem;
            // border-bottom : 1px solid #aaaaaa;
            height : 2rem;
            font-size : 0.875rem;
            font-weight: 600;
            letter-spacing: -0.025rem;
            text-align: left;

            > .meta {
                width: 5rem;
                display: inline-block;
                text-align: left;
                margin : 0 10rem 1.5rem 3rem;
                font-size: 1.125rem;
                font-weight: 600;
                line-height: 1.125rem;
            }
        }
    }

    >.top_li {
        margin-top: 2rem;
    }
`

const ViewTx = () => {
    const dispatch = useDispatch()
    const viewWallet = useSelector(state => state.viewWallet)
    const idx = window.location.href.split('/')[4]
    const [ targetWallet, setTargetWallet] = useState(idx)

    const getWallet = (idx) => {
        dispatch({ type : viewWallet_request.toString(), payload : {idx : idx} }) 
        setTargetWallet(idx)
    }

    useEffect(() => {getWallet(idx)}, [dispatch])

    return (
        <>
            <AccountBanner> 
                <div> Account : {targetWallet} </div> 
                <span className='tx_history'> tx history </span>
                <span className='coinbase'><Link to={'/viewcoinbase/' + targetWallet}>coinbase</Link></span>
            </AccountBanner>
            <Pg_Wrap>

            {
                viewWallet.viewWallet.map((v,k) => (
                    <Bk_Wrap>
                        <ul>
                            <li> 
                                <span className='meta'> transactionHash </span> 
                                <Link to={'/viewTx/' + v.transactionHash }> { v.transactionHash } </Link> 
                            </li>
                            <li> <span className='meta'> from </span> 
                                <span onClick= {() => getWallet(v.sender)}> {v.sender} </span>
                            </li>
                            <li> <span className='meta'>to</span>
                                <span onClick = { () => getWallet(v.receiver)}> {v.receiver} </span>
                            </li>
                        </ul>
                    </Bk_Wrap>
                ))
            }
            </Pg_Wrap>
        </>
    )
}

export default ViewTx;