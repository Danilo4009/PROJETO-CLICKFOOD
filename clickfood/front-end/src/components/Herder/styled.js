import styled from 'styled-components';

export const AreaHeader = styled.div`
    padding: 10px 20px;
    background-color: #fff;
    border-bottom: 1px solid #ccc;

    .container {
        padding: 5px 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
        .logo img{
            height: 20px;
        }

        nav {
            display: flex;
            flex: 1;
            align-items: center;
            justify-content: space-between;

            ul{
                display: flex;
            }
                li {
                    list-style: none;
                    margin-left: 20px;

                    a {
                        text-decoration: none;
                        color: #000000;
                        font-weight: bold;

                        &:hover {
                            color: #ea1d2c;
                        }
                    }
                }

            .avatar {
                display: flex;
                align-items: center;

                img {
                    width: 35px;
                    border-radius: 20px;
                    margin-left: 20px;
                    margin-right: 10px;
                    cursor: pointer;
                }
                
                label {
                    font-size: 14px;
                    cursor: pointer;
                    color: #000000;
                }

                @media screen and (max-width: 600px){
                    label {
                        display: none;
                    }
                }
            }
        
        }
`;