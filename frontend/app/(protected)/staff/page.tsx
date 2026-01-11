export default function StaffPage() {
    return <div>
        <div className="flex mb-4 flex-wrap justify-between items-start gap-4">
            <div className="flex flex-col gap-2">
                <h1 className="text-[#111418] dark:text-white text-3xl font-extrabold leading-tight tracking-tight">Team &amp; Staff</h1>
                <p className="text-[#617589] dark:text-gray-400 text-base font-normal max-w-2xl">Manage schedules, roles, and access permissions for your team members across all locations.</p>
            </div>
            <button className="flex items-center justify-center gap-2 rounded-lg h-10 px-5 bg-primary hover:bg-blue-600 text-white text-sm font-bold shadow-sm transition-all hover:shadow-md">
                <span className="material-symbols-outlined text-lg">add</span>
                <span className="truncate">Add New Staff</span>
            </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col gap-1 rounded-xl p-5 bg-white dark:bg-[#1a2632] border border-[#dbe0e6] dark:border-gray-700 shadow-sm">
                <div className="flex items-center justify-between">
                    <p className="text-[#617589] dark:text-gray-400 text-sm font-medium">Total Staff</p>
                    <span className="material-symbols-outlined text-primary text-xl">group</span>
                </div>
                <p className="text-[#111418] dark:text-white text-2xl font-bold">12</p>
            </div>
            <div className="flex flex-col gap-1 rounded-xl p-5 bg-white dark:bg-[#1a2632] border border-[#dbe0e6] dark:border-gray-700 shadow-sm">
                <div className="flex items-center justify-between">
                    <p className="text-[#617589] dark:text-gray-400 text-sm font-medium">Active Today</p>
                    <span className="material-symbols-outlined text-green-500 text-xl">check_circle</span>
                </div>
                <p className="text-[#111418] dark:text-white text-2xl font-bold">8</p>
            </div>
            <div className="flex flex-col gap-1 rounded-xl p-5 bg-white dark:bg-[#1a2632] border border-[#dbe0e6] dark:border-gray-700 shadow-sm">
                <div className="flex items-center justify-between">
                    <p className="text-[#617589] dark:text-gray-400 text-sm font-medium">On Leave</p>
                    <span className="material-symbols-outlined text-orange-400 text-xl">beach_access</span>
                </div>
                <p className="text-[#111418] dark:text-white text-2xl font-bold">2</p>
            </div>
            <div className="flex flex-col gap-1 rounded-xl p-5 bg-white dark:bg-[#1a2632] border border-[#dbe0e6] dark:border-gray-700 shadow-sm">
                <div className="flex items-center justify-between">
                    <p className="text-[#617589] dark:text-gray-400 text-sm font-medium">Pending Invites</p>
                    <span className="material-symbols-outlined text-gray-400 text-xl">mail</span>
                </div>
                <p className="text-[#111418] dark:text-white text-2xl font-bold">1</p>
            </div>
        </div>

        <div className="flex mt-4 flex-col md:flex-row gap-4 justify-between items-center bg-white dark:bg-[#1a2632] p-2 rounded-xl border border-[#dbe0e6] dark:border-gray-700 shadow-sm">
            <div className="w-full md:max-w-md">
                <div className="relative flex items-center w-full h-10 rounded-lg focus-within:ring-2 focus-within:ring-primary/50 overflow-hidden bg-[#f0f2f4] dark:bg-gray-800">
                    <div className="grid place-items-center h-full w-12 text-gray-500 dark:text-gray-400">
                        <span className="material-symbols-outlined">search</span>
                    </div>
                    <input className="peer h-full w-full outline-none text-sm text-[#111418] dark:text-white bg-transparent pr-2 placeholder-gray-500 dark:placeholder-gray-400" placeholder="Search by name, role, or email..." type="text" />
                </div>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto px-2 md:px-0 no-scrollbar">
                <button className="flex items-center justify-center h-9 px-4 rounded-lg bg-[#111418] dark:bg-white text-white dark:text-[#111418] text-sm font-medium whitespace-nowrap transition-colors">
                    All Roles
                </button>
                <button className="flex items-center justify-center h-9 px-4 rounded-lg bg-[#f0f2f4] dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-[#111418] dark:text-white text-sm font-medium whitespace-nowrap transition-colors">
                    Providers
                </button>
                <button className="flex items-center justify-center h-9 px-4 rounded-lg bg-[#f0f2f4] dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-[#111418] dark:text-white text-sm font-medium whitespace-nowrap transition-colors">
                    Receptionist
                </button>
                <button className="flex items-center justify-center h-9 px-4 rounded-lg bg-[#f0f2f4] dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-[#111418] dark:text-white text-sm font-medium whitespace-nowrap transition-colors">
                    Admin
                </button>
            </div>
        </div>

        <div className="grid grid-cols-1 mt-4 md:grid-cols-2 lg:grid-cols-3 gap-5">

            <div className="bg-white dark:bg-[#1a2632] border border-[#dbe0e6] dark:border-gray-700 rounded-xl p-5 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow group relative">
                <div className="absolute top-4 right-4">
                    <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                        <span className="material-symbols-outlined">more_vert</span>
                    </button>
                </div>
                <div className="flex items-start gap-4">
                    <div className="size-16 rounded-full bg-cover bg-center shadow-inner" data-alt="Portrait of Dr. Sarah Jenkins" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAxnSXUBEa5MjKV-ucaVRmcXQYJ9YeTdP0G-duX6beGGivoxSE4d9whmE0aNOcx_8jo1iX9MIc3If7lvPjYAQlEvXab1BYkA0CYW5SZPznWabpMPs0RCx6N7z4KTdKTfz4WSg-GTmGOo7ufLslUKwKV0RG3VpH3kfd99OvSa5tD8TZWbIebGJkwsYIhb37xWczsgx7ortGXZERRtFo4njTbHF2_ygPPxqZUdDGltAcVx8_9NURZcfcExdk3bbYEngrTviJGYEtovgE')" }}></div>
                    <div className="flex flex-col pt-1">
                        <h3 className="text-[#111418] dark:text-white text-lg font-bold leading-tight">Sarah Jenkins</h3>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-bold px-2 py-0.5 rounded-full">Provider</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 border-t border-gray-100 dark:border-gray-700 pt-4">
                    <div className="flex items-center gap-3 text-sm text-[#617589] dark:text-gray-400">
                        <span className="material-symbols-outlined text-[20px]">mail</span>
                        <span className="truncate">sarah.j@salon.com</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-[#617589] dark:text-gray-400">
                        <span className="material-symbols-outlined text-[20px]">call</span>
                        <span>+1 (555) 012-3456</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-[#617589] dark:text-gray-400">
                        <span className="material-symbols-outlined text-[20px]">spa</span>
                        <span>Hair, Coloring, Styling</span>
                    </div>
                </div>
                <div className="flex items-center justify-between mt-2 pt-2">
                    <div className="flex items-center gap-2">
                        <div className="w-9 h-5 bg-primary rounded-full relative cursor-pointer">
                            <div className="absolute right-1 top-1 size-3 bg-white rounded-full shadow-sm"></div>
                        </div>
                        <span className="text-xs font-medium text-[#111418] dark:text-white">Active</span>
                    </div>
                    <button className="text-sm font-bold text-primary hover:bg-primary/5 px-3 py-1.5 rounded-md transition-colors">Manage</button>
                </div>
            </div>

            <div className="bg-white dark:bg-[#1a2632] border border-[#dbe0e6] dark:border-gray-700 rounded-xl p-5 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow group relative">
                <div className="absolute top-4 right-4">
                    <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                        <span className="material-symbols-outlined">more_vert</span>
                    </button>
                </div>
                <div className="flex items-start gap-4">
                    <div className="size-16 rounded-full bg-cover bg-center shadow-inner" data-alt="Portrait of Mark Thompson" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDzU_eGRPUZ5rr-4uPSc-_6QPz6SZ9FvSxf5o0QDXH8hOOrrGEi6xkTTJFkaPcSkUwgQuOKLqDyQuujUx2deGVqKZHBfQGNae6xf3yuf75I37aIxOBChVlXobZGYjlYfiYww1QZ0GGlHaCh3fiDGr1ApBT-QRJiqo86yIGQaYHJ8n2Vu4zRD_fCAE-oHOyQqzAOPBxRi-68DnjHM59-z_Zqj7MSuH9Bm-6_3HFiic8ndxRZsUAdvZ75BEdiGtwlfANKKy_y71xvRHQ')" }}></div>
                    <div className="flex flex-col pt-1">
                        <h3 className="text-[#111418] dark:text-white text-lg font-bold leading-tight">Mark Thompson</h3>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 text-xs font-bold px-2 py-0.5 rounded-full">Admin</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 border-t border-gray-100 dark:border-gray-700 pt-4">
                    <div className="flex items-center gap-3 text-sm text-[#617589] dark:text-gray-400">
                        <span className="material-symbols-outlined text-[20px]">mail</span>
                        <span className="truncate">mark.t@salon.com</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-[#617589] dark:text-gray-400">
                        <span className="material-symbols-outlined text-[20px]">call</span>
                        <span>+1 (555) 987-6543</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-[#617589] dark:text-gray-400">
                        <span className="material-symbols-outlined text-[20px]">verified_user</span>
                        <span>Full System Access</span>
                    </div>
                </div>
                <div className="flex items-center justify-between mt-2 pt-2">
                    <div className="flex items-center gap-2">
                        <div className="w-9 h-5 bg-primary rounded-full relative cursor-pointer">
                            <div className="absolute right-1 top-1 size-3 bg-white rounded-full shadow-sm"></div>
                        </div>
                        <span className="text-xs font-medium text-[#111418] dark:text-white">Active</span>
                    </div>
                    <button className="text-sm font-bold text-primary hover:bg-primary/5 px-3 py-1.5 rounded-md transition-colors">Manage</button>
                </div>
            </div>

            <div className="bg-white dark:bg-[#1a2632] border border-[#dbe0e6] dark:border-gray-700 rounded-xl p-5 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow group relative">
                <div className="absolute top-4 right-4">
                    <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                        <span className="material-symbols-outlined">more_vert</span>
                    </button>
                </div>
                <div className="flex items-start gap-4">
                    <div className="size-16 rounded-full bg-cover bg-center shadow-inner" data-alt="Portrait of Jessica Lee" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDgUFSk97RBL3AD99vSMfq8GOetmiBZo72vwe-0FZ88_l8QEG_UJCfkeJUK5hLnzQ_8XiMX3IjXBQLeGLQ-6n7DWTowpskTJvA7BPBSp5L4SUvjcBXcSr33Lf2q4qWM6NikTWSb-xi2uLQ5N2VXQG00ay2_qUa62IqUxynVLoURRQBc-4hF95_3_CeuQ2PbRTJWwUP85Oo0dZPgx-hVysETT5ZTUJi9SJg1j33iJTnCdIcmr3gjEa2bdUiJsaix5FmGxcHCEdupuhQ')" }}></div>
                    <div className="flex flex-col pt-1">
                        <h3 className="text-[#111418] dark:text-white text-lg font-bold leading-tight">Jessica Lee</h3>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 text-xs font-bold px-2 py-0.5 rounded-full">Receptionist</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 border-t border-gray-100 dark:border-gray-700 pt-4">
                    <div className="flex items-center gap-3 text-sm text-[#617589] dark:text-gray-400">
                        <span className="material-symbols-outlined text-[20px]">mail</span>
                        <span className="truncate">jessica.l@salon.com</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-[#617589] dark:text-gray-400">
                        <span className="material-symbols-outlined text-[20px]">call</span>
                        <span>+1 (555) 234-5678</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-[#617589] dark:text-gray-400">
                        <span className="material-symbols-outlined text-[20px]">calendar_month</span>
                        <span>Front Desk, Scheduling</span>
                    </div>
                </div>
                <div className="flex items-center justify-between mt-2 pt-2">
                    <div className="flex items-center gap-2">
                        <div className="w-9 h-5 bg-primary rounded-full relative cursor-pointer">
                            <div className="absolute right-1 top-1 size-3 bg-white rounded-full shadow-sm"></div>
                        </div>
                        <span className="text-xs font-medium text-[#111418] dark:text-white">Active</span>
                    </div>
                    <button className="text-sm font-bold text-primary hover:bg-primary/5 px-3 py-1.5 rounded-md transition-colors">Manage</button>
                </div>
            </div>

            <div className="bg-white dark:bg-[#1a2632] border border-[#dbe0e6] dark:border-gray-700 rounded-xl p-5 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow group relative">
                <div className="absolute top-4 right-4">
                    <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                        <span className="material-symbols-outlined">more_vert</span>
                    </button>
                </div>
                <div className="flex items-start gap-4">
                    <div className="size-16 rounded-full bg-cover bg-center shadow-inner" data-alt="Portrait of David Kim" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDTy6sTBw-s-dSLAlz-Z2KdNwIllhoP5kbo9BmSmI3hczajNDkeOUcQ8QWqi6bndiNNOzPnLV1mY0u5BXIuQpaqcg_ULXwkqiwvKSYL8lW5Mbu632r0ZjK9vQ9Y94TMUPqJ0FGmNMr3HsDc2kapM2HC0fBtqajahOUiPpFFcg7j32wTcIFn8TqBtOqBLH6FZ0On1_8OIXQU7bc3WJWWSNcsdcGrup-gttTi446Y8EOJx5hGOG5SyHkiWSl-240uURUE6SNA_wB5kBs')" }}></div>
                    <div className="flex flex-col pt-1">
                        <h3 className="text-[#111418] dark:text-white text-lg font-bold leading-tight">David Kim</h3>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-bold px-2 py-0.5 rounded-full">Provider</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 border-t border-gray-100 dark:border-gray-700 pt-4">
                    <div className="flex items-center gap-3 text-sm text-[#617589] dark:text-gray-400">
                        <span className="material-symbols-outlined text-[20px]">mail</span>
                        <span className="truncate">david.k@salon.com</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-[#617589] dark:text-gray-400">
                        <span className="material-symbols-outlined text-[20px]">call</span>
                        <span>+1 (555) 345-6789</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-[#617589] dark:text-gray-400">
                        <span className="material-symbols-outlined text-[20px]">spa</span>
                        <span>Massage Therapy</span>
                    </div>
                </div>
                <div className="flex items-center justify-between mt-2 pt-2">
                    <div className="flex items-center gap-2">
                        <div className="w-9 h-5 bg-gray-300 dark:bg-gray-600 rounded-full relative cursor-pointer">
                            <div className="absolute left-1 top-1 size-3 bg-white rounded-full shadow-sm"></div>
                        </div>
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Inactive</span>
                    </div>
                    <button className="text-sm font-bold text-primary hover:bg-primary/5 px-3 py-1.5 rounded-md transition-colors">Manage</button>
                </div>
            </div>

            <div className="bg-white dark:bg-[#1a2632] border border-[#dbe0e6] dark:border-gray-700 rounded-xl p-5 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow group relative">
                <div className="absolute top-4 right-4">
                    <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                        <span className="material-symbols-outlined">more_vert</span>
                    </button>
                </div>
                <div className="flex items-start gap-4">
                    <div className="size-16 rounded-full bg-cover bg-center shadow-inner" data-alt="Portrait of Emily Chen" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBv-ZviW-PkIqQcrPgnr4DfS8YX9g7dK46KdNl91AIUr2AGq0mDcDgKb_OqsAmrbBDNGcHmMvFM_bgdButIQjWkeJpS9ogpXr0mWEUpG_BqaIEh0urH7iM_zjibY4X5kA_oevoDjnlVNTaDlOMwVEe4vxE-w7n0FGx__BY3AWBPMsz_jKtNM8Z2oHSeed3mY9yRvw2KS7XL12sICXcAS2nhX-QU1zeahQWPIRo0vbTc8MlKVuNICHlhoEs6XuMMV6NRhEenW07P_mg')" }}></div>
                    <div className="flex flex-col pt-1">
                        <h3 className="text-[#111418] dark:text-white text-lg font-bold leading-tight">Emily Chen</h3>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-bold px-2 py-0.5 rounded-full">Provider</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 border-t border-gray-100 dark:border-gray-700 pt-4">
                    <div className="flex items-center gap-3 text-sm text-[#617589] dark:text-gray-400">
                        <span className="material-symbols-outlined text-[20px]">mail</span>
                        <span className="truncate">emily.c@salon.com</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-[#617589] dark:text-gray-400">
                        <span className="material-symbols-outlined text-[20px]">call</span>
                        <span>+1 (555) 456-7890</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-[#617589] dark:text-gray-400">
                        <span className="material-symbols-outlined text-[20px]">spa</span>
                        <span>Nails, Manicure, Pedicure</span>
                    </div>
                </div>
                <div className="flex items-center justify-between mt-2 pt-2">
                    <div className="flex items-center gap-2">
                        <div className="w-9 h-5 bg-primary rounded-full relative cursor-pointer">
                            <div className="absolute right-1 top-1 size-3 bg-white rounded-full shadow-sm"></div>
                        </div>
                        <span className="text-xs font-medium text-[#111418] dark:text-white">Active</span>
                    </div>
                    <button className="text-sm font-bold text-primary hover:bg-primary/5 px-3 py-1.5 rounded-md transition-colors">Manage</button>
                </div>
            </div>

            <div className="bg-white dark:bg-[#1a2632] border border-[#dbe0e6] dark:border-gray-700 rounded-xl p-5 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow group relative opacity-75">
                <div className="absolute top-4 right-4">
                    <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                        <span className="material-symbols-outlined">more_vert</span>
                    </button>
                </div>
                <div className="flex items-start gap-4">
                    <div className="size-16 rounded-full bg-cover bg-center shadow-inner grayscale" data-alt="Portrait of Michael Brown" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD18OWlhKoohZ4vppFsriRwwWPDQ7oTq3MafBoysehGrnNk2TlqdUMflVm-ydnf12GdSGg5d_8xsLBFnKdp_0WJaGguGni3n8JeAIQuQe53FtsBSWeXBN7CLsoyp2BMnkPsbWpkc7qpCTo9e7BNgIKH2ymORhr87htsOWoWFb8p7r1T0J7wiDoNwtUEjsbMkQqQjG0ASnCV-7L3eMqrHhho7K9K-PCjtd0veMB60Aj9hjfiUnfIs45srYAZx35HJevNyrGFij1cZ-U')" }}></div>
                    <div className="flex flex-col pt-1">
                        <h3 className="text-[#111418] dark:text-white text-lg font-bold leading-tight">Michael Brown</h3>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-bold px-2 py-0.5 rounded-full">Provider</span>
                            <span className="bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 text-xs font-bold px-2 py-0.5 rounded-full">On Leave</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 border-t border-gray-100 dark:border-gray-700 pt-4">
                    <div className="flex items-center gap-3 text-sm text-[#617589] dark:text-gray-400">
                        <span className="material-symbols-outlined text-[20px]">mail</span>
                        <span className="truncate">michael.b@salon.com</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-[#617589] dark:text-gray-400">
                        <span className="material-symbols-outlined text-[20px]">call</span>
                        <span>+1 (555) 567-8901</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-[#617589] dark:text-gray-400">
                        <span className="material-symbols-outlined text-[20px]">spa</span>
                        <span>Personal Training</span>
                    </div>
                </div>
                <div className="flex items-center justify-between mt-2 pt-2">
                    <div className="flex items-center gap-2">
                        <div className="w-9 h-5 bg-gray-300 dark:bg-gray-600 rounded-full relative cursor-pointer">
                            <div className="absolute left-1 top-1 size-3 bg-white rounded-full shadow-sm"></div>
                        </div>
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Paused</span>
                    </div>
                    <button className="text-sm font-bold text-primary hover:bg-primary/5 px-3 py-1.5 rounded-md transition-colors">Manage</button>
                </div>
            </div>
        </div>
        <div className="flex items-center mt-4 justify-center pt-4">
            <button className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-primary transition-colors flex items-center gap-1">
                Load More Staff
                <span className="material-symbols-outlined text-lg">expand_more</span>
            </button>
        </div>
    </div>
}