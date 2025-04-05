import { Divider } from "@heroui/react";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block text-center justify-center max-w-[85vw]">
          {children}
        </div>
      </section>
      <section className="text-center py-2">
        <Divider className="my-10 w-full" />
        <p className="text-small text-gray-500 pb-2">
          &copy; i would say all rights reseverd but i cant, right? &trade;
        </p>
      </section>
    </>
  );
}
