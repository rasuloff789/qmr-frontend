import { t } from "i18next";

export default function ({ handleSubmit, username, setUsername, password, setPassword, loading }) {
    return <>
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">{t("login")}</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Username */}
                <div>
                    <label className="block text-gray-700 mb-1" htmlFor="username">
                        {t("username")}
                    </label>
                    <input
                        type="text"
                        value={username}
                        id="username"
                        placeholder={t("inputUsername")}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>

                {/* Password */}
                <div>
                    <label className="block text-gray-700 mb-1" htmlFor="password">
                        {t("password")}
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        placeholder={t("inputPassword")}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>

                {/* Submit button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-500 text-black py-2 rounded-lg hover:bg-blue-600 transition-colors">
                    {loading ? t("loading") : t("login")}
                </button>
            </form>
        </div>
    </>
}