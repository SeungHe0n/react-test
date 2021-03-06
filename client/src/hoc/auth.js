
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';

// option 설정
// null : 아무나 출입 가능
// true : 로그인한 유저만 출입 가능 / false : 로그인한 유저 출입 불가능

export default function (SpecificComponent, option, adminRoute = null) {

    function AuthenticationCheck(props) {
        
        const dispatch = useDispatch();

        useEffect(() => {

            dispatch(auth()).then(response => {
                if(!response.payload.isAuth) {
                    if(option) {
                        props.history.push('/login');
                    }
                } else {
                    if(adminRoute && !response.payload.isAdmin) {
                        props.history.push('/');
                    } else {
                        if(option === false) {
                            props.history.push('/');
                        }
                    }
                }
            });

        }, []);

        return (
            <SpecificComponent />
        );

    }

    return AuthenticationCheck;
}