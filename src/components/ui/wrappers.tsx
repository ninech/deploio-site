export const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className="mx-auto max-w-screen-2xl">{children}</div>;
};

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-[url('/images/background-pattern.png')] bg-top bg-repeat">
      {children}
    </div>
  );
};
