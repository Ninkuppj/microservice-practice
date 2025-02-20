'use client'
import Sidebar from "@/components/sidebar/page"
import {QueryClientProvider, queryClient} from '../lib/queryClient'
export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <section
       className="overflow-hidden h-[90vh]"
       >
      <QueryClientProvider client={queryClient}>

        {/* Include shared UI here e.g. a header or sidebar */}
        <Sidebar/>
        <section className="md:w-[88%] lg:w-[82%] ml-auto m-3 mt-[10px] h-full bg-white rounded-[8px] pt-5 px-4">
          {children}
        </section>
        </QueryClientProvider>
      </section>
    )
  }