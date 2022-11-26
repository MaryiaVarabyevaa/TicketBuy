import * as React from 'react';
import {useEffect, useLayoutEffect, useState} from "react";
import {getAllUsers} from "../../http/userAPI";
import {Autocomplete, TextField} from "@mui/material";
import internal from "stream";
import Stack from "@mui/material/Stack";

type Skill = {
    id: number
    label: string
}

type User  = {
    id: number,
    email: string,
}

const AdminPanel = () => {
    const [value, setValue] = useState<Skill | null>(null)
    const [users, setUsers] = useState<Skill[]>();

    console.log(value)

    const getUsers = async () => {
        const users = await getAllUsers();
        const arr: Skill[] = [];

        users.map((user: User) => {
            const {email, id} = user;
            arr.push({
                id,
                label: `${email}`
            })
        })
        setUsers(arr);
    }

    useEffect(() => {
        getUsers();
    }, [])


    return (
        <div>
            {
                users &&
                <Autocomplete
                    options={users}
                    sx={{ width: 300 }}
                    id="auto-highlight"
                    autoHighlight
                    renderInput={params => <TextField {...params} label='Users' />}
                    value={value}
                    onChange={(_event: any, newValue: Skill | null) => {
                        setValue(newValue)
                    }}
                />
            }
        </div>
    )

};

export default AdminPanel;