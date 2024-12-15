interface StandloneLayoutProps {
  children: React.ReactNode;
}

const DocumentLayout: React.FC<StandloneLayoutProps> = ({ children }) => (
  <main className="min-h-screen bg-neutral-50">
    <div className="mx-auto max-w-screen-2xl p-4">
      <div className="flex flex-col items-center justify-center py-4">
        {children}
      </div>
    </div>
  </main>
);

export default DocumentLayout;
