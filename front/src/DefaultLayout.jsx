import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, Layout } from 'antd';
import styled  from 'styled-components';
import { backend } from './utils/ip.js';
import { frontend } from './utils/ip.js';

const Wrap = styled.div`
    width : 100%;
    height: 10rem;
    margin : 1rem;
    background : gray;
    > span {
        font-size : 1.75rem;
        
    }
`

const Logo = styled.span`
    font-size: 2.5rem !important;
    margin : 0 0 0 2rem;
`

const Finder = styled.div`
    display: inline-block;
    margin : 0 auto;
    height: 6rem;
    display:flex;
    align-items: center;
    justify-content: center;
    width: 50rem;

    > form {
        position: absolute;
        height: 2rem;
        margin : 0 auto;
        > select {
            margin : 0 0.25rem 0 0;
            height : 2.5rem;
            text-align: center;
            font-weight: 600;
            font-size : 1.125rem;
        }
    } 
`

const KeyWord = styled.input `
    margin : 0 0.25rem 0 0;
    width : 35rem;
    height: 2.5rem;
    border-radius: 0.25rem;
`
const Submit = styled.input`
    height : 2.5rem;
`

const DefaultHeader = () => {
    const dispatch = useDispatch();
    // const stores = useSelector(state => state);

    const submitHandler = async (e) => {
        e.preventDefault()
        const mode = e.target.category.value
        console.log(e.target.keyword.value)

        if( mode =='blockheight' || mode == 'blockhash' ) {
            window.location.href=`${frontend}/viewblock/${e.target.keyword.value}`
        }

        else if (mode == 'txhash') {
            window.location.href = `${frontend}/viewTx/${e.target.keyword.value}`
        }
        else if (mode == 'account') {
            window.location.href=`${frontend}/viewWallet/${e.target.keyword.value}`
        }

    }

    return (
        <Wrap>  
            <Logo><Link to='/'> Logo </Link></Logo>
            <Finder>
                <form onSubmit={submitHandler}>
                    <select name="category" id="category" >
                        <option value="txhash" id="txhash" defaultValue>tx hash</option>
                        <option value="blockhash" id="blockhash">block hash</option>
                        <option value="blockheight" id="blockheight">block height</option>
                        <option value="account" id="account">account</option>
                    </select>
                    <KeyWord type='text' name='keyword'/>
                    <Submit type='submit' value='search'/>
                </form>
            </Finder>
        </Wrap>
    )
};

export default DefaultHeader;
