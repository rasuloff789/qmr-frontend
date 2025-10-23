import { t } from "i18next";

export default function AdminInputs({
    username,
    setUsername,
    password,
    setPassword,
    fullname,
    setFullname,
    tgUsername,
    setTgUsername,
    errors = {}, // ⚠️ qo‘shildi
}) {
    return (
        <>
            {/* Fullname */}
            <div className="col-span-2">
                <label htmlFor="fullname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    {t("fullname")}
                </label>
                <input
                    type="text"
                    name="fullname"
                    id="fullname"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    className={`bg-gray-50 border ${errors.fullname ? "border-red-500" : "border-gray-300"} text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                    placeholder={t("typeFullname")}
                />
                {errors.fullname && (
                    <p className="text-red-500 text-xs mt-1">{errors.fullname}</p>
                )}
            </div>

            {/* Username */}
            <div className="col-span-2">
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    {t("username")}
                </label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={`bg-gray-50 border ${errors.username ? "border-red-500" : "border-gray-300"} text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                    placeholder={t("typeUsername")}
                />
                {errors.username && (
                    <p className="text-red-500 text-xs mt-1">{errors.username}</p>
                )}
            </div>

            {/* Password */}
            <div className="col-span-2">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    {t("password")}
                </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`bg-gray-50 border ${errors.password ? "border-red-500" : "border-gray-300"} text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                    placeholder={t("typePassword")}
                />
                {errors.password && (
                    <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
            </div>

            {/* Telegram username */}
            <div className="col-span-2">
                <label htmlFor="tgUsername" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    {t("tgUsername")}
                </label>
                <input
                    type="text"
                    name="tgUsername"
                    id="tgUsername"
                    value={tgUsername}
                    onChange={(e) => setTgUsername(e.target.value)}
                    className={`bg-gray-50 border ${errors.tgUsername ? "border-red-500" : "border-gray-300"} text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                    placeholder={t("typeTgUsername")}
                />
                {errors.tgUsername && (
                    <p className="text-red-500 text-xs mt-1">{errors.tgUsername}</p>
                )}
            </div>
        </>
    );
}
