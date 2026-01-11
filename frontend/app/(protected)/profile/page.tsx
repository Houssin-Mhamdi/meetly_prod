export default function ProfilePage() {
    return <div>
        <div className="flex flex-col gap-2">
            <h1 className="text-slate-900 dark:text-white text-3xl font-bold tracking-tight">Account Settings</h1>
            <p className="text-slate-500 dark:text-slate-400 text-base">Manage your personal information and security preferences.</p>
        </div>

        <section className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Profile Picture</h2>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="relative group">
                    <div className="bg-center bg-no-repeat bg-cover rounded-full h-24 w-24 ring-4 ring-white dark:ring-slate-800 shadow-lg" data-alt="Portrait of Sarah Jenkins smiling in professional attire" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAyHhadlbzxEBqMLTcAcyPqyn4DTBGqZ5rmRvfkZtuKanHXQV_jFc3oqmB55qwVsK88vKHHmmo06Iywg1Qb4IoZ7OaWZMu3ORQB2W_ZV4NJHk4zBXByx7kEqo1nr7djnFUN7jeBSgzw17J7UTIJZS5P8GKEeBbLix6oKPe0GlfU9tMCzzHQcTVt0LXLXc53Fi5Dk5fc9U99S7cB_QeTg011s1UPABsDrSWKlVkKnFWJ0o11Ai6kBlADXQvPzb_EeypMW8MegsGKn7s')" }}></div>
                    <div className="absolute bottom-0 right-0 bg-green-500 h-4 w-4 rounded-full border-2 border-white dark:border-slate-800"></div>
                </div>
                <div className="flex flex-col gap-4 flex-1">
                    <div className="flex flex-col text-center sm:text-left">
                        <p className="text-slate-900 dark:text-white text-xl font-bold">Sarah Jenkins</p>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">sarah.jenkins@eventmgmt.com</p>
                    </div>
                    <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                        <button className="flex items-center justify-center gap-2 rounded-lg h-9 px-4 bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-all shadow-sm">
                            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>upload</span>
                            Upload New
                        </button>
                        <button className="flex items-center justify-center gap-2 rounded-lg h-9 px-4 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                            Remove
                        </button>
                    </div>
                    <p className="text-xs text-slate-400 dark:text-slate-500 text-center sm:text-left">
                        Recommended: Square JPG, PNG, or GIF, at least 1,000 pixels per side.
                    </p>
                </div>
            </div>
        </section>


        <section className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Personal Information</h2>
                <button className="text-primary text-sm font-medium hover:underline">Edit</button>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">First Name</span>
                    <input className="form-input w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary focus:ring-primary h-11 px-4 text-sm" type="text" value="Sarah" />
                </label>
                <label className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Last Name</span>
                    <input className="form-input w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary focus:ring-primary h-11 px-4 text-sm" type="text" value="Jenkins" />
                </label>
                <label className="flex flex-col gap-2 md:col-span-2">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</span>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 material-symbols-outlined" style={{ fontSize: "20px" }}>mail</span>
                        <input className="form-input w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary focus:ring-primary h-11 pl-10 pr-4 text-sm" type="email" value="sarah.jenkins@eventmgmt.com" />
                    </div>
                </label>
                <label className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Phone Number</span>
                    <input className="form-input w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary focus:ring-primary h-11 px-4 text-sm" type="tel" value="+1 (555) 000-0000" />
                </label>
                <label className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Timezone</span>
                    <select className="form-select w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary focus:ring-primary h-11 px-4 text-sm">
                        <option>Pacific Standard Time (PST)</option>
                        <option>Eastern Standard Time (EST)</option>
                        <option>Greenwich Mean Time (GMT)</option>
                    </select>
                </label>
            </div>
            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm hover:bg-primary/90 transition-colors">
                    Save Changes
                </button>
            </div>
        </section>

        <section className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Security</h2>
            </div>
            <div className="p-6 flex flex-col gap-6">
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                    <div>
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Password</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Last changed 3 months ago</p>
                    </div>
                    <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                        Change Password
                    </button>
                </div>
                <hr className="border-slate-100 dark:border-slate-800" />
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                    <div>
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Two-Factor Authentication</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Add an extra layer of security to your account.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input className="sr-only peer" type="checkbox" value="" />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/30 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                    </label>
                </div>
            </div>
        </section>

        <section className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full text-primary">
                    <span className="material-symbols-outlined">support_agent</span>
                </div>
                <div>
                    <h3 className="text-base font-semibold text-slate-900 dark:text-white">Need help?</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Something not working right? Let us know.</p>
                </div>
            </div>
            <button className="whitespace-nowrap px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined text-slate-400" style={{ fontSize: "18px" }}>flag</span>
                Report an Issue
            </button>
        </section>

        <section className="rounded-xl border border-red-200 dark:border-red-900/30 bg-red-50/50 dark:bg-red-900/10 p-6 mt-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h3 className="text-base font-bold text-red-700 dark:text-red-400">Delete Account</h3>
                    <p className="text-sm text-red-600/80 dark:text-red-400/70 mt-1 max-w-lg">
                        Permanently remove your account and all of its contents from the Event Manager platform. This action is not reversible.
                    </p>
                </div>
                <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition-colors shadow-sm">
                    Close Account
                </button>
            </div>
        </section>

        <footer className="max-w-[800px] mx-auto mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center pb-8">
            <p className="text-xs text-slate-400 dark:text-slate-600">© 2023 Event Manager Inc. All rights reserved.</p>
        </footer>
    </div>
}