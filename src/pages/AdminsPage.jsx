import AdminsTable from "../components/AdminsTable";
import SearchAdminInput from "../components/SearchAdmin";
import AddAdmin from "../components/AddAdmin";
import { useQuery } from "@apollo/client/react";
import { useState, useEffect } from "react";
import { gql } from "@apollo/client";



const GET_ADMINS = gql`
  query GetAdmins {
    getAdmins {
      id
      fullname
      username
      phone
      tgUsername
      birthDate
      isActive
    }
  }
`;


export default function () {
    const [search, AdminSearch] = useState("")
    const { loading, error, data, refetch } = useQuery(GET_ADMINS);
    const [admins, setAdmins] = useState([]);

    useEffect(() => {
        if (!data?.getAdmins) return;

        const filtered = data.getAdmins.filter((a) => {
            const query = search.toLowerCase().trim();
            return (
                a.id.toString() === query || // id bo‘yicha
                a.fullname.toLowerCase().includes(query) || // ism bo‘yicha
                a.username.toLowerCase().includes(query) || // username bo‘yicha
                a.phone.includes(query) || // telefon raqam bo‘yicha
                a.birthDate.includes(query) // telefon raqam bo‘yicha

            );
        });

        setAdmins(filtered);
    }, [search, data]);

    useEffect(() => {
        if (data?.getAdmins) {
            setAdmins(data.getAdmins);
        }
    }, [data]);

    return (
        <>
            <div className="flex justify-between items-center">
                <SearchAdminInput search={search} AdminSearch={AdminSearch} />
                <AddAdmin onAdminAdded={refetch} />
            </div>

            <AdminsTable loading={loading} admins={admins} onAdminDeleted={refetch} />
        </>
    )
}