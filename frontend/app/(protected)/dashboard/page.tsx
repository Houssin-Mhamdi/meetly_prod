
"use client"
import {
    Calendar,
    FileText,
    Clock4,
    BanknoteArrowUp,
    Calendar1,
    FileCheckCorner,
    Users,
    TriangleAlert,
    Mail,
    MessageSquareText,
    CheckCircle,
    CalendarPlus,
} from "lucide-react"
import { useRouter } from "next/navigation";
export default function DashbordPage() {
    const router = useRouter()
    return (
        <main className="flex-1 flex flex-col h-full overflow-y-auto overflow-x-hidden">
            <header className="flex flex-col mb-4 md:flex-row md:items-center justify-between gap-4 p-2 md:p-4 bg-white dark:bg-[#111a22] border-b border-[#dbe0e6] dark:border-gray-800 sticky top-0 z-10">
                <div className="flex flex-col gap-1">
                    <h1 className="text-[#111418] dark:text-white text-2xl md:text-3xl font-black leading-tight tracking-[-0.033em]">Good morning, Alex</h1>
                    <div className="flex items-center gap-2 text-[#617589] dark:text-gray-400 text-sm font-medium">
                        <Clock4 size={18} />
                        <p>It's Tuesday, Oct 24 • You are in EST Timezone</p>
                    </div>

                </div>
                <div className="flex gap-3">
                    <button onClick={() => router.push("/invoices")} className="flex-1 flex cursor-pointer md:flex-none h-10 px-4 items-center justify-center gap-2 rounded-lg bg-background-light dark:bg-gray-700 text-[#111418] dark:text-white text-sm font-bold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors border border-gray-200 dark:border-gray-600">
                        <FileText size={18} />
                        <span>New Invoice</span>
                    </button>
                    <button onClick={() => router.push("/appointments")} className="flex-1 flex cursor-pointer md:flex-none h-10 px-4 items-center justify-center gap-2 rounded-lg bg-primary text-white text-sm font-bold hover:bg-blue-600 transition-colors shadow-md shadow-blue-500/20">
                        <Calendar size={18} />
                        <span>New Appointment</span>
                    </button>
                </div>
            </header>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

                <div className="flex cursor-pointer flex-col gap-2 rounded-xl p-6 bg-white dark:bg-[#111a22] border border-[#dbe0e6] dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <p className="text-[#617589] dark:text-gray-400 text-sm font-medium">Today's Revenue</p>
                        <span className="material-symbols-outlined text-primary bg-primary/10 p-1.5 rounded-lg text-[20px]"><BanknoteArrowUp size={20} /></span>
                    </div>
                    <div className="flex items-end gap-2">
                        <p className="text-[#111418] dark:text-white text-2xl font-bold leading-tight">$1,240</p>
                        <span className="text-[#078838] bg-green-500/10 px-1.5 py-0.5 rounded text-xs font-bold mb-1">+12%</span>
                    </div>
                </div>

                <div className="flex cursor-pointer flex-col gap-2 rounded-xl p-6 bg-white dark:bg-[#111a22] border border-[#dbe0e6] dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <p className="text-[#617589] dark:text-gray-400 text-sm font-medium">Appointments Today</p>
                        <span className="material-symbols-outlined text-primary bg-primary/10 p-1.5 rounded-lg text-[20px]"><Calendar1 size={20} /></span>
                    </div>
                    <div className="flex items-end gap-2">
                        <p className="text-[#111418] dark:text-white text-2xl font-bold leading-tight">8</p>
                        <span className="text-[#078838] bg-green-500/10 px-1.5 py-0.5 rounded text-xs font-bold mb-1">+2%</span>
                    </div>
                </div>

                <div className="flex cursor-pointer flex-col gap-2 rounded-xl p-6 bg-white dark:bg-[#111a22] border border-[#dbe0e6] dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <p className="text-[#617589] dark:text-gray-400 text-sm font-medium">Pending Invoices</p>
                        <span className="material-symbols-outlined text-orange-500 bg-orange-500/10 p-1.5 rounded-lg text-[20px]"><FileCheckCorner size={20} /></span>
                    </div>
                    <div className="flex items-end gap-2">
                        <p className="text-[#111418] dark:text-white text-2xl font-bold leading-tight">$3,200</p>
                        <span className="text-[#617589] bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded text-xs font-bold mb-1">0%</span>
                    </div>
                </div>

                <div className=" flex  cursor-pointer flex-col gap-2 rounded-xl p-6 bg-white dark:bg-[#111a22] border border-[#dbe0e6] dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <p className="text-[#617589] dark:text-gray-400 text-sm font-medium">New Clients</p>
                        <span className="material-symbols-outlined text-purple-500 bg-purple-500/10 p-1.5 rounded-lg text-[20px]"><Users size={20} /></span>
                    </div>
                    <div className="flex items-end gap-2">
                        <p className="text-[#111418] dark:text-white text-2xl font-bold leading-tight">2</p>
                        <span className="text-[#078838] bg-green-500/10 px-1.5 py-0.5 rounded text-xs font-bold mb-1">+1%</span>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-[#111418] dark:text-white text-xl font-bold leading-tight">Upcoming Appointments</h2>
                        <a className="text-primary text-sm font-bold hover:underline" href="#">View All</a>
                    </div>
                    <div className="rounded-xl border border-[#dbe0e6] dark:border-gray-800 bg-white dark:bg-[#111a22] overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-[#f9fafb] dark:bg-gray-800/50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-[#617589] dark:text-gray-400 uppercase tracking-wider">Time</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-[#617589] dark:text-gray-400 uppercase tracking-wider">Client</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-[#617589] dark:text-gray-400 uppercase tracking-wider">Service</th>
                                        <th className="px-6 py-4 text-center text-xs font-semibold text-[#617589] dark:text-gray-400 uppercase tracking-wider">Staff</th>
                                        <th className="px-6 py-4 text-center text-xs font-semibold text-[#617589] dark:text-gray-400 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-4 text-right text-xs font-semibold text-[#617589] dark:text-gray-400 uppercase tracking-wider">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#dbe0e6] dark:divide-gray-800">

                                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-medium text-[#111418] dark:text-white whitespace-nowrap">09:00 AM</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="size-8 rounded-full bg-cover bg-center" data-alt="Portrait of Sarah Jenkins" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCs-vPDDJvJwUnpK_OUhzKE-Oeah78hJGlMh9ws8Sac3SbNHaUrXEOnEvdvEbcy_40BhPh2nGhWFm3-GPW-DTnZrQA3J86Reri5v10hteCdEF5fc2__touawY6fuGIzfHi1Q1BFHBp_CbBS2MSdrWt1ob7CGssM46y_Ykapv-IHF516zdfVn5J5-5grBosDn42zQ93XZwfpqsvdo-M14e6tcMkjh3PmqAjaHWihPaFNF-euxcV8s9mOGOdbo5R3XBcKlPAFZZQ7f2I")' }}></div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-semibold text-[#111418] dark:text-white">Sarah Jenkins</span>
                                                    <span className="text-xs text-[#617589] dark:text-gray-400">First Visit</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-[#111418] dark:text-gray-300">Consultation</td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="size-8 rounded-full bg-cover bg-center mx-auto border-2 border-white dark:border-gray-800" data-alt="Portrait of staff member" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBikaS3mIbAX-zL-swypg7CmpGsFLMUQp4swtOL70TwGX1_3UnsuaVoushOq-5OTD0Q8LEdKHTmU_mWzKtVRxUMlANpyUogpOuu3575RX2FQevVZ971xW1tshNX8zHQEMF-rrrE3s0HqP_NsmkI9RQstPs6nE_zFrOS4xDD6EEiwQ5eK0nOvfrRVLB9-N58vWdb6cK6EvilURazC35c6WDy9y256j1Ign2oi49Fn1Z1U1gZb_EPc1jrpi4W5NFMiyORa3lbsgBdSHc")' }}></div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                                <span className="size-1.5 rounded-full bg-green-600 dark:bg-green-400"></span> Confirmed
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-[#617589] hover:text-primary dark:text-gray-400 dark:hover:text-white transition-colors">
                                                <span className="material-symbols-outlined text-[20px]">more_vert</span>
                                            </button>
                                        </td>
                                    </tr>

                                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-medium text-[#111418] dark:text-white whitespace-nowrap">10:30 AM</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="size-8 rounded-full bg-cover bg-center" data-alt="Portrait of Mike Ross" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC6SVnIo5tUX11aneWWcSBz7ibu07_DigJzY8H66iB43Yn5b8HioioWuGUHbijOB8AapVosC9OB9libdnV0UFvC6Xaw5vSzVRLUWt9sZxXSkACYMpfHvZyWe-tLZ7unoNuYROSn5Zw-5Y8m5x-yFVMUqKu1eyplbZN70UcW_vjmn_zqPA-j0cfeBciDIt10ivH8jpBpQKC-EjC4A0G6WWde79UDCwAdaE49DZmvxc1QNoH93AT2szeTfS-wdkTZSVQbEtyin04AHDM")' }}></div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-semibold text-[#111418] dark:text-white">Mike Ross</span>
                                                    <span className="text-xs text-[#617589] dark:text-gray-400">Returning</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-[#111418] dark:text-gray-300">Therapy Session</td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="size-8 rounded-full bg-cover bg-center mx-auto border-2 border-white dark:border-gray-800" data-alt="Portrait of staff member" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCvs9WajdebQSYfRZurF9MnXoxTxgoFN2mYimVW4Ndud-UG9ygGeblaP7jC8vcL2TikEkyLFxyYZ9PMQ4DjADP7MNK7g8YSxQ7vYHmNIE70T--vA69_WOhjFOfTT59ij8e3569nVjdBsAYowss0nvTf3tX6480jOwD3WRBg3I_X1jLMLogtNByq9wqlVFprrLtCa6cO71cL4xkLTmHOkRARNhoRw7xZ1JFLoskQv4RrU3WoDqiihEZqlFFWP6CaIclIUd8tt1ZMmE8")' }}></div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                                                <span className="size-1.5 rounded-full bg-yellow-600 dark:bg-yellow-400"></span> Pending
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-[#617589] hover:text-primary dark:text-gray-400 dark:hover:text-white transition-colors">
                                                <span className="material-symbols-outlined text-[20px]">more_vert</span>
                                            </button>
                                        </td>
                                    </tr>

                                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-medium text-[#111418] dark:text-white whitespace-nowrap">01:00 PM</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="size-8 rounded-full bg-cover bg-center" data-alt="Portrait of Jessica Pearson" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDmXet-tG94GfgA9KM_51qMIJ_jEO74oFNv3xdZ890gRQR9ngYGvFOVaklwwBL0ZRiUNBKXjorAqLq0_J9uBh6jw2c8Fa4OCkhf9YKNWorkUSnVeOKBphvYr3dffP9nZSGook5oKjvOoVdWWEFLqm-WghJ64Dmx4XvE_C0W2A4oTOjDi9WVFKX2Lf6MYJiPSx7W5oC1UF5hVp4T8Nbk_onbyuKXVh7fOyZI5ddeXE2iDJ9exzX0CEVti0AFAoDP4dOcxbEijMWfsPI")' }}></div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-semibold text-[#111418] dark:text-white">Jessica Pearson</span>
                                                    <span className="text-xs text-[#617589] dark:text-gray-400">Regular</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-[#111418] dark:text-gray-300">Legal Advice</td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="size-8 rounded-full bg-cover bg-center mx-auto border-2 border-white dark:border-gray-800" data-alt="Portrait of staff member" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDO5g3XLe0xGyg9dDdxHZU3KuDF4gLDyVMvd2PopOW9ywqcmh_gbFi6INQGtKGb70xRzfjEEbF3NQ2lx1ZRl9ZLSQmtrAcOz3_czYYZCWgOgBvJPsBw3hlUbq6ZI9ihFZ5N2FYdwS7E1KA1by6hanAczUe1DOcemLmbhjqP77Ez2am63gOp7ZbdULraMd-rd6GIcK3BvqIggl2YrFSLAKPEo0NSgACT74w7tvFghwdeTbBo8LOo0KuMUIwhA0v-oHyx7mreQK07WJ8")' }}></div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                                                <span className="size-1.5 rounded-full bg-red-600 dark:bg-red-400"></span> Rescheduled
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-[#617589] hover:text-primary dark:text-gray-400 dark:hover:text-white transition-colors">
                                                <span className="material-symbols-outlined text-[20px]">more_vert</span>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-8">

                    <div className="flex flex-col gap-4">
                        <h2 className="text-[#111418] dark:text-white text-xl font-bold leading-tight">Attention Needed</h2>
                        <div className="bg-white dark:bg-[#111a22] rounded-xl border border-[#dbe0e6] dark:border-gray-800 shadow-sm p-5 flex flex-col gap-5">
                            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
                                <div className="flex items-center gap-3">
                                    <div className="size-10 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-500">
                                        <span className="material-symbols-outlined text-[20px]"><TriangleAlert size={20} /></span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-[#111418] dark:text-white">Harvey Specter</p>
                                        <p className="text-xs text-red-500 font-medium">Overdue (2 days)</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-[#111418] dark:text-white">$850.00</p>
                                    <button className="text-xs text-primary font-bold hover:underline">Remind</button>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="size-10 rounded-full bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-orange-500">
                                        <span className="material-symbols-outlined text-[20px]"><Mail size={20} /></span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-[#111418] dark:text-white">Donna Paulsen</p>
                                        <p className="text-xs text-[#617589] dark:text-gray-400">Draft saved</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-[#111418] dark:text-white">$320.00</p>
                                    <button className="text-xs text-primary font-bold hover:underline">Edit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-[#111418] dark:text-white text-xl font-bold leading-tight">Recent Activity</h2>
                        </div>
                        <div className="bg-white dark:bg-[#111a22] rounded-xl border border-[#dbe0e6] dark:border-gray-800 shadow-sm p-6 relative">
                            <div className="relative flex flex-col gap-6">
                                <div className="absolute left-[19px] top-2 bottom-2 w-[2px] bg-gray-100 dark:bg-gray-800"></div>
                                <div className="relative flex gap-4">
                                    <div className="relative z-10 size-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0 border-2 border-white dark:border-[#111a22]">
                                        <span className="material-symbols-outlined text-primary text-[18px]"><MessageSquareText size={18} /></span>
                                    </div>
                                    <div className="flex flex-col pt-1">
                                        <p className="text-sm text-[#111418] dark:text-white leading-tight">Reminder sent to <span className="font-bold">Sarah Jenkins</span></p>
                                        <p className="text-xs text-[#617589] dark:text-gray-400 mt-1">10 minutes ago</p>
                                    </div>
                                </div>
                                <div className="relative flex gap-4">
                                    <div className="relative z-10 size-10 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center shrink-0 border-2 border-white dark:border-[#111a22]">
                                        <span className="material-symbols-outlined text-green-600 text-[18px]"><CheckCircle size={18} /></span>
                                    </div>
                                    <div className="flex flex-col pt-1">
                                        <p className="text-sm text-[#111418] dark:text-white leading-tight">Invoice #1024 <span className="font-bold">Paid</span></p>
                                        <p className="text-xs text-[#617589] dark:text-gray-400 mt-1">1 hour ago</p>
                                    </div>
                                </div>

                                <div className="relative flex gap-4">
                                    <div className="relative z-10 size-10 rounded-full bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center shrink-0 border-2 border-white dark:border-[#111a22]">
                                        <span className="material-symbols-outlined text-purple-600 text-[18px]"><CalendarPlus size={18} /></span>
                                    </div>
                                    <div className="flex flex-col pt-1">
                                        <p className="text-sm text-[#111418] dark:text-white leading-tight"><span className="font-bold">Mike Ross</span> rescheduled</p>
                                        <p className="text-xs text-[#617589] dark:text-gray-400 mt-1">2 hours ago</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </main>
    );
}    