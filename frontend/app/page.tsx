
"use client"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  return <div className="flex flex-col min-h-screen">
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-white/5 px-6 lg:px-20 py-4 sticky top-0 bg-background-dark/90 backdrop-blur-md z-[100]">
      <div className="flex items-center gap-4 text-white">
        <div className="size-6 text-primary">
          <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z" fill="currentColor"></path>
          </svg>
        </div>
        <h2 className="text-white text-xl font-bold leading-tight tracking-tight uppercase tracking-widest">SmartSchedule</h2>
      </div>
      <div className="hidden md:flex flex-1 justify-center gap-9">
        <a className="text-[#9cadba] hover:text-white transition-colors text-xs font-bold uppercase" href="#">Platform</a>
        <a className="text-[#9cadba] hover:text-white transition-colors text-xs font-bold uppercase" href="#">Solutions</a>
        <a className="text-[#9cadba] hover:text-white transition-colors text-xs font-bold uppercase" href="#">Pricing</a>
        <a className="text-[#9cadba] hover:text-white transition-colors text-xs font-bold uppercase" href="#">Company</a>
      </div>
      <div className="flex gap-4">
        <button onClick={() => {
          router.push('/login')
        }} className="hidden sm:flex min-w-[100px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 text-[#9cadba] hover:text-white text-sm font-bold">
          Log In
        </button>
        <button onClick={() => {
          router.push('/signup')
         }} className="flex min-w-[120px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20">
          Start Trial
        </button>
      </div>
    </header>
    <main className="flex-1 flex flex-col items-center pt-24 px-4 overflow-visible">
      <div className="max-w-5xl text-center mb-24 relative">
        <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8">
          <div className="flex -space-x-2">
            <img alt="Trusted User" className="size-6 rounded-full ring-2 ring-background-dark border-white/10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEzukTFHe8E8qu0XwxIh1nPYoWXLoiivY2hBAOU_gw0FRgBYV-H-_mBb53SOuTuHAyiiHSGN0PPJt2FAKHbXQnqBrQ1M6mAyGydhQ2OYPLEURp7jL0zeuFzGB1jIapFX2GFKRNrpTjGUz9ZHQWkcU4NcRfuiFD_uolHONN8c2T_HdPBAxbDonjut2hKNox9I4CtkEwKRGzBBkKDQv9MaTzaHGEXYpoJPwf4ppJH2TdB4LxzsEKejzU_3UlaAVTYVz9Kax6gnFAzhY" />
            <img alt="Trusted User" className="size-6 rounded-full ring-2 ring-background-dark border-white/10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbdQDR36JjAPXKEImcrqWPVNDhjxl_4Ao99b6xtZWDzFJ4_a8681r5A9LAuqcK0CoNOF2rT_mcw0nLk1BW5NJcE2cx5fO7lFWi21BJE3Z9gga9glTYicNYz0lgc2UnlQfdV9-2X9fhzwdSxTps4KPUaYX2tYH76M9_wkqVLf8zKAfjaKxkKsSERldNiFTXxRD1yWJkuaAFIcbUVY4aQog0TPwuZl8u9nVKM4dJ2CcfVROb1IzCwgcoKVdrUzAoewDaFWE0A4c8Be4" />
            <img alt="Trusted User" className="size-6 rounded-full ring-2 ring-background-dark border-white/10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-xkTzsZgkeOFl6PPoiNr97q5L_yXu3Dseuj9C3U5qxL6Y_mdQuaZKPd4U1poS59lnv1cO0OmPtYvE5PKzS42T4X-GiGhcAAr2ReytEueGxOCq59gCA8gQEvE_A2yseKytMTG-52nMrCsB37HJon3uZj83DwrIK2My2nkZEI8RiTqvHOoIFz8PpzGPwJx0_NKTaRUhpEqRk7_2nmZ7QjMuFACOKdJs8RXPE_cVSvGeRFbPvicFHUG1D0PIyfCg2J3XlJJvzJ_wvWI" />
            <img alt="Trusted User" className="size-6 rounded-full ring-2 ring-background-dark border-white/10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDI0H1FLk3awDzWq6lI7ZCMNvqoBmx7aFOpnMqy7byulYM5QkCPjFKYtzXpVoyRzZUDNohYV93N-UITqeGeU7Pyp-MBgN5hASMHjKWYfGBNGrJMy82qhc7FrPI3OQbMOaWLxTAolpYeFmUEWanAJVDh4rKNULMy-lwp1jANTUlieRU_P0C7k_MqqCku-J4tbVqqV9-nMxq_JQjjXceHTVqlb76r8sqqCg1VGk92J3ANF47tI9g8S5JhI9334-tWHQGY8iTuD-ew5h0" />
          </div>
          <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Trusted by 5,000+ experts</p>
        </div>
        <h1 className="text-black tracking-tighter text-6xl md:text-8xl font-extrabold leading-[0.9] pb-8">
          GROW YOUR <br /><span className="text-primary glow-text italic">SERVICE BUSINESS</span>
        </h1>
        <p className="text-[#9cadba] text-xl max-w-2xl mx-auto font-medium leading-relaxed">
          The high-performance platform for modern professionals. Scheduling, billing, and growth tools engineered for scale.
        </p>
      </div>
      <div className="relative w-full max-w-[1200px] mt-12 mb-48 flex justify-center items-center">
        <svg className="absolute inset-0 w-full h-full -z-10 overflow-visible" viewBox="0 0 1200 600">
          <circle cx="600" cy="300" r="300" stroke="#374151" strokeWidth="1" fill="none" strokeDasharray="12 12" className="opacity-40" />
          <circle cx="600" cy="300" r="450" stroke="#1f2937" strokeWidth="1" fill="none" strokeDasharray="20 20" className="opacity-40" />
          <circle cx="600" cy="300" r="600" stroke="#111827" strokeWidth="1" fill="none" strokeDasharray="30 30" className="opacity-30" />
          <path className="decorative-path" d="M100,50 Q300,0 500,100 T900,50" strokeWidth="2"></path>
          <path className="decorative-path" d="M1100,400 Q900,500 700,400 T300,550" strokeWidth="2"></path>
          <path className="decorative-path" d="M0,300 C200,100 400,500 600,300 S1000,500 1200,100" strokeWidth="1.5"></path>
        </svg>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary/5 rounded-full blur-[160px] pointer-events-none"></div>
        <div className="absolute -top-16 -left-4 lg:-left-20 z-40 translate-y-4">
          <div className="glass-card p-5 rounded-2xl flex items-center gap-4 w-80 shadow-2xl border-l-4 border-l-primary animate-float">
            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined font-bold">payments</span>
            </div>
            <div>
              <p className="text-[10px] text-[#9cadba] font-bold uppercase tracking-wider">Payment Received</p>
              <p className="text-base text-white font-extrabold">$2,450.00 <span className="text-white/50 font-medium">from Dental Care Plus</span></p>
            </div>
          </div>
        </div>
        <div className="absolute top-1/4 -right-4 lg:-right-32 z-40 -translate-y-8">
          <div className="glass-card p-5 rounded-2xl flex items-center gap-4 w-72 shadow-2xl border-l-4 border-l-[#0bda5b] animate-float delay-700">
            <div className="size-12 rounded-xl bg-[#0bda5b]/10 flex items-center justify-center text-[#0bda5b]">
              <span className="material-symbols-outlined font-bold">event_available</span>
            </div>
            <div>
              <p className="text-[10px] text-[#9cadba] font-bold uppercase tracking-wider">New Booking</p>
              <p className="text-base text-white font-extrabold">Executive Suite</p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-4 -left-8 lg:-left-16 z-40 translate-x-4">
          <div className="glass-card p-5 rounded-2xl flex items-center gap-4 w-64 shadow-2xl border-l-4 border-l-orange-500 animate-float delay-1500">
            <div className="size-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
              <span className="material-symbols-outlined font-bold">mail</span>
            </div>
            <div>
              <p className="text-[10px] text-[#9cadba] font-bold uppercase tracking-wider">Automatic Invoice</p>
              <p className="text-base text-white font-extrabold">Sent to 4 clients</p>
            </div>
          </div>
        </div>
        <div className="relative w-full max-w-[960px] bg-[#0c0d10] rounded-[2.5rem] p-4 border-[6px] border-[#2d333a] laptop-skew glow-primary shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
          <div className="bg-background-dark w-full aspect-[16/10] rounded-[1.5rem] overflow-hidden border border-[#283239] flex flex-col">
            <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl text-white font-extrabold tracking-tight">Enterprise Overview</h3>
                  <p className="text-[#9cadba] text-xs font-bold uppercase tracking-widest mt-1">Real-time Metrics</p>
                </div>
                <div className="flex gap-4">
                  <div className="size-10 rounded-xl bg-surface-gray border border-white flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-xl">search</span>
                  </div>
                  <div className="size-10 rounded-full bg-primary p-0.5">
                    <img className="w-full h-full rounded-full object-cover" data-alt="Avatar of business owner" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLHgBh5wKqt4c6W3nS0TkAsGdjVf3PVGMY6N95iBlpnuuS1oqqS6K1v38t2uFJ0VIbY3AFvOp4rAQ5y_gJFHVDMZfIiPEO6nR6IBJYiYp_C7cyfa5Yc90FC69Brr7n9KukJhOHpYAAjrc4PybNKK_e4EiCdh8je7m9k2XtvNOwNJY8_AXU_Gyi1U2tHSJAdcuRMTd9A2ac-lYlByncI9uQWjp-Bw2LQlvcnYFzqYbfTl6iDEID_QqTP1qqXfiHRg6ssPgDK7_RyNc" />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-8 bg-surface-dark/50 rounded-2xl p-6 border border-white/5">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-[#9cadba] text-xs font-bold uppercase tracking-widest mb-1">Gross Revenue</p>
                      <p className="text-4xl text-white font-extrabold tracking-tighter">$142,820.00</p>
                    </div>
                    <div className="px-3 py-1 bg-[#0bda5b]/10 text-[#0bda5b] text-xs font-extrabold rounded-full border border-[#0bda5b]/20">+24.5%</div>
                  </div>
                  <div className="h-40 w-full mt-2 relative">
                    <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 120">
                      <defs>
                        <linearGradient id="gradient-hero" x1="0%" x2="0%" y1="0%" y2="100%">
                          <stop offset="0%" stopColor="#259df4" stopOpacity="0.3"></stop>
                          <stop offset="100%" stopColor="#259df4" stopOpacity="0"></stop>
                        </linearGradient>
                      </defs>
                      <path d="M0,100 C50,85 80,30 120,50 C160,70 200,10 250,20 C300,30 350,5 400,10 L400,120 L0,120 Z" fill="url(#gradient-hero)"></path>
                      <path d="M0,100 C50,85 80,30 120,50 C160,70 200,10 250,20 C300,30 350,5 400,10" fill="none" stroke="#259df4" strokeLinecap="round" strokeWidth="4"></path>
                    </svg>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-4 flex flex-col gap-6">
                  <div className="bg-surface-dark/50 rounded-2xl p-6 border border-white/5 flex-1">
                    <p className="text-[#9cadba] text-[10px] font-extrabold uppercase tracking-widest">Growth Velocity</p>
                    <p className="text-3xl text-white font-extrabold mt-1">92%</p>
                    <div className="mt-4 w-full bg-white/5 h-2 rounded-full overflow-hidden">
                      <div className="bg-primary h-full w-[92%] shadow-[0_0_10px_#259df4]"></div>
                    </div>
                  </div>
                  <div className="bg-primary rounded-2xl p-6 flex-1 text-white relative overflow-hidden">
                    <div className="relative z-10">
                      <p className="text-white/70 text-[10px] font-extrabold uppercase tracking-widest">Active Leads</p>
                      <p className="text-3xl font-extrabold mt-1">84</p>
                    </div>
                    <span className="material-symbols-outlined absolute -bottom-2 -right-2 text-8xl text-white/10">rocket_launch</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[98%] h-8 bg-[#2d333a] rounded-b-3xl laptop-skew opacity-60"></div>
      </div>
      <div className="w-full bg-[#0d0f13] border-y border-white/5 py-32 px-4 flex justify-center">
        <div className="max-w-[1200px] w-full grid md:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-2xl group-hover:bg-primary/20 transition-all duration-500"></div>
            <div className="relative bg-surface-dark border border-white/10 rounded-3xl overflow-hidden aspect-video shadow-2xl">
              <div className="absolute inset-0 flex">
                <div className="w-1/2 h-full border-r border-white/10 bg-gradient-to-t from-black/60 to-transparent relative">
                  <img alt="Clinic Owner" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBisk6keXKzostbMqzJqBmIn5a2rPTLxZXldNN6UGNlhw63CaoujrOkoo0leVSWjn4fUgc49_oVW0CoCaqGjNj8pBwst3zaoy3jLyWmyZNs5Z5ItfxLNDb7b7JFQ7oF7JGgs0ulf0l3O4MGlS012ggpk5jHbcl1NEFdwqC4lOzmZJZujz5OoELjN951IA29kz1901PdI0SkYgrfga87OuqsSV2efytPDfgzci16xwzWhPj7QKGTXLyD-sKwvvlVEIg_bP4h-CkVz-g" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <div className="size-2 rounded-full bg-red-500 animate-pulse"></div>
                    <p className="text-[10px] font-bold uppercase">Dr. Sarah Chen (Clinic Owner)</p>
                  </div>
                </div>
                <div className="w-1/2 h-full relative">
                  <img alt="Patient" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAJb_rRUb3zYGbdHKXqR790AAHqRFqWMEgASv2lo_EuQrNwdTdo8CTAulEhTkCdMp6ERTaCpjElSlPIiyl7HE4SfUPxuqE8egm-1RZkn7ylK8-wHYHPaG-zPCx0KoqI-RjEtyvbDQo6w1zw_whIf4fbF-nJ93IGgf_NiyDoSr6y2YyyuoODnJ6gNSyvP0ls9dELk0G_YY6aZjxFXfbOdrlylCUWrEy-zkOXfKtrgbq-xmf2O1fysq4I1f08Tf8Z2bQf3H824R7er0" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <div className="size-2 rounded-full bg-green-500"></div>
                    <p className="text-[10px] font-bold uppercase">Virtual Patient Consultation</p>
                  </div>
                </div>
              </div>
              <div className="absolute top-4 right-4 flex gap-2">
                <div className="size-8 rounded-lg bg-black/40 backdrop-blur-md flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-sm">mic</span>
                </div>
                <div className="size-8 rounded-lg bg-red-500/80 backdrop-blur-md flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-sm">call_end</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex gap-1 text-primary">
              <span className="material-symbols-outlined fill-1">star</span>
              <span className="material-symbols-outlined fill-1">star</span>
              <span className="material-symbols-outlined fill-1">star</span>
              <span className="material-symbols-outlined fill-1">star</span>
              <span className="material-symbols-outlined fill-1">star</span>
            </div>
            <blockquote className="text-3xl font-bold leading-tight italic text-white">
              "SmartSchedule didn't just organize my clinic—it accelerated our growth by 40%. The automated billing and seamless video integration is a game-changer for modern medicine."
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-full bg-primary overflow-hidden border-2 border-primary/20">
                <img alt="Dr. Sarah Chen" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPqbjD82S5gFlvUEQiSOywosBmSvzeu811WNBXwnIacw499jlx-Jgnd1Qp4OlTOJ1U9Ac7ja7IC2U6ohLsaJFBA9fUipDHzWGPYosxWVJPBy7oohQtDrrLBrdLOQ7_Vq0Yx8sSB42NKmxcAR5O36jRk2sXRIYOpt-PWvLtsCTvVlbtQ4806O4fhBzn_96FWE0jAMk6mMF0q9jX2UoyzVUPUwEqJyboLHueFZKPynTFntJUFuFU4RPwJ_2y1oW9ahQ6mkqlc0LbcBY" />
              </div>
              <div>
                <p className="font-bold">Dr. Sarah Chen</p>
                <p className="text-sm text-[#9cadba] font-medium uppercase tracking-widest">Founder, Zenith Wellness Clinic</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[1200px]  w-full grid grid-cols-1 md:grid-cols-3 gap-12 py-32 px-4">
        <div className="flex flex-col bg-background-light gap-6 p-8 rounded-[2rem] bg-surface-dark border border-white/5 hover:border-primary/30 transition-all duration-300">
          <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-3xl font-bold">bolt</span>
          </div>
          <div>
            <h4 className="text-2xl font-bold mb-2">High-Speed Setup</h4>
            <p className="text-[#9cadba] leading-relaxed">Infrastructure that grows with you. Get your bespoke booking portal live in under 5 minutes.</p>
          </div>
        </div>
        <div className="flex flex-col bg-background-light gap-6 p-8 rounded-[2rem] bg-surface-dark border border-white/5 hover:border-primary/30 transition-all duration-300">
          <div className="size-14 rounded-2xl bg-[#0bda5b]/10 flex items-center justify-center text-[#0bda5b]">
            <span className="material-symbols-outlined text-3xl font-bold">account_balance_wallet</span>
          </div>
          <div>
            <h4 className="text-2xl font-bold mb-2">Smart Invoicing</h4>
            <p className="text-[#9cadba] leading-relaxed">Automated accounts receivable. Integrated Stripe processing ensures you get paid 3x faster.</p>
          </div>
        </div>
        <div className="flex flex-col bg-background-light gap-6 p-8 rounded-[2rem] bg-surface-dark border border-white/5 hover:border-primary/30 transition-all duration-300">
          <div className="size-14 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400">
            <span className="material-symbols-outlined text-3xl font-bold">insights</span>
          </div>
          <div>
            <h4 className="text-2xl font-bold mb-2">Growth Analytics</h4>
            <p className="text-[#9cadba] leading-relaxed">Deep-dive into client retention and LTV. Data-driven decisions for the modern entrepreneur.</p>
          </div>
        </div>
      </div>
    </main>
    <footer className="border-t border-white/5 py-16 px-6 md:px-20 bg-background-dark">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="flex flex-col items-center md:items-start gap-6">
          <div className="flex items-center gap-4 text-white">
            <div className="size-8 text-primary">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z" fill="currentColor"></path>
              </svg>
            </div>
            <span className="font-extrabold text-2xl tracking-tighter uppercase">SmartSchedule</span>
          </div>
          <p className="text-[#9cadba] text-sm max-w-xs text-center md:text-left">Building the infrastructure for the next generation of service-based enterprises.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-[#9cadba] text-xs font-bold uppercase tracking-widest">
          <a className="hover:text-primary transition-colors" href="#">Product</a>
          <a className="hover:text-primary transition-colors" href="#">Security</a>
          <a className="hover:text-primary transition-colors" href="#">API Docs</a>
          <a className="hover:text-primary transition-colors" href="#">Status</a>
          <a className="hover:text-primary transition-colors" href="#">Careers</a>
        </div>
        <div className="flex flex-col items-center md:items-end gap-2">
          <div className="flex gap-4 mb-2">
            <div className="size-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 cursor-pointer transition-colors">
              <span className="material-symbols-outlined text-lg">language</span>
            </div>
            <div className="size-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 cursor-pointer transition-colors">
              <span className="material-symbols-outlined text-lg">mail</span>
            </div>
          </div>
          <p className="text-[#9cadba] text-[10px] font-bold uppercase tracking-widest">© 2024 SmartSchedule Global Inc.</p>
        </div>
      </div>
    </footer>
  </div>;
}