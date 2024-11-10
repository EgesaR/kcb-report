import { Skeleton, Spinner } from "@nextui-org/react"

const SkeletonLayout = () => {
  return (
    <div className="h-screen w-full bg-white px-3 pt-1 text-white flex">
      <aside
        className={`h-full ease-in-out duration-300 w-[24%] relative border-r-1 border-slate-100 pr-3 overflow-hidden`}
      >
        <Skeleton className="rounded-lg">
          <div className="h-8 rounded-lg bg-default-700"></div>
        </Skeleton>
        <div className="mt-6">
          <Skeleton className="rounded-lg w-1/5">
            <div className="h-4 rounded-lg bg-default-700"></div>
          </Skeleton>
          <div className="flex flex-col gap-6 mt-2">
            <Skeleton className="rounded-lg">
              <div className="h-8 rounded-lg bg-default-700"></div>
            </Skeleton>
            <Skeleton className="rounded-lg">
              <div className="h-8 rounded-lg bg-default-700"></div>
            </Skeleton>
            <Skeleton className="rounded-lg">
              <div className="h-8 rounded-lg bg-default-700"></div>
            </Skeleton>
          </div>
        </div>
        <div
          className={`absolute bottom-5 w-full flex items-center flex-col justify-center gap-4 pr-3`}
        >
          <Skeleton className="rounded-lg w-full">
            <div className="h-8 rounded-lg bg-default-700"></div>
          </Skeleton>
          <Skeleton className="rounded-lg w-full">
            <div className="h-8 rounded-lg bg-default-700"></div>
          </Skeleton>

          <div className="w-full flex items-center justify-center border-t-1 border-slate-100 pt-6 gap-3">
            <div>
              <Skeleton className="flex rounded-full w-12 h-12" />
            </div>
            <div className="w-full flex flex-col gap-2">
              <Skeleton className="h-3 w-3/5 rounded-lg" />
              <Skeleton className="h-3 w-4/5 rounded-lg" />
            </div>
          </div>
        </div>
      </aside>
      <main className="w-full h-[90vh]">
        <div className="w-full py-2 px-3 border-b-1 border-slate-100">
          <div>
            <Skeleton className="rounded-lg w-1/6">
              <div className="h-10 rounded-lg bg-default-700"></div>
            </Skeleton>
          </div>
          <div className="flex ml-auto"></div>
        </div>
        <div className="w-full h-full bg-cyan-100/80 rounded-xl flex items-center justify-center">
 <Spinner label="Loading..." color="warning" />
        </div>
      </main>
    </div>
  );
}

export default SkeletonLayout