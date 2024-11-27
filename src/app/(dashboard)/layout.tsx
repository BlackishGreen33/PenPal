import { NuqsAdapter } from 'nuqs/adapters/next/app';

import { Navbar } from '@/common/components/nav';
import Sidebar from '@/common/components/nav/Sidebar';
import CreateProjectModal from '@/common/components/projects/CreateProjectModal';
import { CreateWorkspaceModal } from '@/common/components/workspaces/CreateWorkspacesModal';

// import { CreateTaskModal } from '@/features/tasks/components/create-task-modal';
// import { EditTaskModal } from '@/features/tasks/components/edit-task-modal';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen">
      <NuqsAdapter>
        <CreateWorkspaceModal />
        <CreateProjectModal />
        {/*<CreateTaskModal />
      <EditTaskModal /> */}
        <div className="flex h-full w-full">
          <div className="fixed left-0 top-0 hidden h-full overflow-y-auto lg:block lg:w-[264px]">
            <Sidebar />
          </div>
          <div className="w-full lg:pl-[264px]">
            <div className="mx-auto h-full max-w-screen-2xl">
              <Navbar />
              <main className="flex h-full flex-col px-6 py-8">{children}</main>
            </div>
          </div>
        </div>
      </NuqsAdapter>
    </div>
  );
};

export default DashboardLayout;
