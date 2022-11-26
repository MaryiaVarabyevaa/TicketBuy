import * as React from 'react';
import {useEffect, useState} from 'react';
import {getAllUsers} from "../../http/userAPI";
import {Autocomplete, TextField} from "@mui/material";
import {IUserEmails, IUserField} from "../../types/user";

const AdminPanel = () => {
    const [value, setValue] = useState<IUserField | null>(null)
    const [users, setUsers] = useState<IUserField[]>();

    console.log(value)

    const getUsers = async () => {
        const users = await getAllUsers();
        const arr: IUserField[] = [];

        users.map((user: IUserEmails) => {
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
                    onChange={(_event: any, newValue: IUserField | null) => {
                        setValue(newValue)
                    }}
                />
            }
        </div>
    )

};

export default AdminPanel;