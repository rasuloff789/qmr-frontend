import { t } from "i18next";

const AdminsTable = function AdminsTable({ loading, admins }) {


    return (<>
        {!loading && admins.length > 0 && <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-blue-200 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-4 font-mono font-medium py-3">ID</th>
                        <th scope="col" className="px-4 font-mono font-medium py-3">{t("fullname")}</th>
                        <th scope="col" className="px-4 font-mono font-medium py-3">{t("username")}</th>
                        <th scope="col" className="px-4 font-mono font-medium py-3">{t("phoneNumber")}</th>
                        <th scope="col" className="px-4 font-mono font-medium py-3">Telegram</th>
                        <th scope="col" className="px-4 font-mono font-medium py-3">{t("birthDate")}</th>
                        <th scope="col" className="px-4 font-mono font-medium py-3 text-center">{t("active")}</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {admins.map((admin) => (
                        <tr key={admin.id} className="hover:bg-gray-100 hover:cursor-pointer bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                            <th scope="col" className="px-4 font-normal py-3">{admin.id}</th>
                            <th scope="col" className="px-4 font-normal py-3">{admin.fullname}</th>
                            <th scope="col" className="px-4 font-normal py-3">{admin.username}</th>
                            <th scope="col" className="px-4 font-normal py-3">
                                <a href={"tel:+" + admin.phone}>{"+" + admin.phone}</a>
                            </th>
                            <th scope="col" className="px-4 font-normal py-3 text-blue-600 dark:text-blue-500 hover:underline text-center">{
                                <a href={"https://t.me/" + admin.tgUsername}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 inline-block align-middle mr-1.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                                    </svg>
                                </a>
                            }</th>
                            <th scope="col" className="px-4 font-normal py-3">{admin.birthDate}</th>
                            <th scope="col" className="px-4 font-normal py-3 text-center">{(admin.isActive &&
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="2 2 20 20"
                                    fill="none"
                                    stroke="green"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-5 h-5 inline-block align-middle"
                                >
                                    <path d="M5 13l4 4L19 7" />
                                </svg>
                            ) ||
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="2 2 20 20"
                                    fill="none"
                                    stroke="red"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-5 h-5 inline-block align-middle"
                                >
                                    <path d="M6 6l12 12M6 18L18 6" />
                                </svg>

                            }</th>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>}
        {
            !loading && !admins.length && (
                <div className="flex-1 flex items-center justify-center h-64 shadow-md border-gray-600 border sm:rounded-lg m-4 text-gray-500 text-lg">
                    {t("noAdmins")}
                </div>
            )
        }

    </>)
}

export default AdminsTable