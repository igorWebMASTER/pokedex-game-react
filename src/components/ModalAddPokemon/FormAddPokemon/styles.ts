import styled from "styled-components";

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 11rem;

    form {
        display: flex;
        flex-direction: column;
        justify-content: center;

        input, select, button{
            margin: 0.3rem 0;
        }

        button{
            margin-top: 5rem;
            padding: 1.6rem 2.4rem;
            background-color: #ff3d71;
            border: 1px solid #ff3d71;
            border-radius: 42px;
            font-weight: bold;
            box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
            font-size: 1.6rem;
            line-height: 1.6;
            text-align: center;
            color: #ffffff;
            cursor: pointer;
            transition: all 0.2s;
            text-transform: uppercase;


            max-width: 250px;
            filter: drop-shadow(0 0px 2.15rem rgba(0,0,0,0.347));
            margin: 0% auto;

    }
    }

    & > div {
        margin: 1rem 0;

        & > label {
            font-size: 1.2rem;
            font-weight: bold;
            text-transform: uppercase;
            margin: 0.1rem 0;
        }
    }



`
