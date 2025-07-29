import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider defaultOpen>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border bg-card flex items-center px-4">
            <SidebarTrigger className="mr-4" />
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Fantasy Basketball Draft
              </h1>
            </div>
          </header>

          <main className="flex-1 p-6 bg-gradient-hero">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}