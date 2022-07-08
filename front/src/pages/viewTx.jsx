import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { viewTx_request } from "../reducers/viewTx";

const Pg_Wrap = styled.div`
    width : 100%;
    display : flex;
    justify-content: center;
`

const Bk_Wrap = styled.div`
    width: 70%;
    margin : 4rem;

    > li {
        list-style: none;
        padding : 0 2rem 0 4.5rem;
        margin: 1rem 1rem 1.75rem 2rem;
        border-bottom : 1px solid #aaaaaa;
        font-size : 1rem;
        font-weight: 600;
        letter-spacing: -0.025rem;

        > span {
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

const ViewTx = () => {
    const dispatch = useDispatch()
    const viewTx = useSelector(state => state.viewTx)
    const idx = window.location.href.split('/')[4]


    const getTx = (idx) => {
        dispatch({ type : viewTx_request.toString(), payload : {idx : idx} })
    }

    useEffect(()  => {getTx(idx)}, [dispatch])

    return (
        <Pg_Wrap>
          {
            viewTx.viewtx.map((v,k) => (
                <Bk_Wrap>
                    <li class='top_li'> <span> transactionHash </span>  { v.transactionHash} </li>
                    <li> <span> transactionIndex </span>  { v.transactionIndex } </li>

                    <li> <span> from </span>  
                        <Link to ={'/viewWallet/' + v.sender }> {v.sender} </Link>
                    </li>
                    <li> <span> to </span>   
                        <Link to ={'/viewWallet/' + v.receiver }> {v.receiver} </Link>
                    </li>
                    <li> <span> blockHash </span> 
                        <Link to ={'/viewBlock/' + v.blockHash }> {v.blockHash} </Link>
                    </li>

                    <li> <span> blockNumber </span> 
                        <Link to ={'/viewBlock/' + v.blockNumber }> { v.blockNumber } </Link>
                    </li>
                    <li> <span> contactAddress </span> {v.contactAddress == null ?
                    'no contract in this tx' : v.contactAddress  } </li>
                    <li> <span> cumulativeGasUsed </span>  {v.cumulativeGasUsed} </li>
                    <li> <span> effectiveGasPrice </span>  {v.effectiveGasPrice} </li>
                    <li> <span> gasUsed </span>  {v.gasUsed} </li>
                    <li> <span> type </span>  {v.type} </li>
                </Bk_Wrap>
            ))
          }
        </Pg_Wrap>
    )
}

export default ViewTx;