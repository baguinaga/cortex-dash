export default function NotFound() {
  return (
    <div className='h-full flex flex-col items-center justify-center text-center'>
      <div>
        <div className='inline-flex'>
          <h1 className='border-r border-border/30 px-6 mr-5 text-2xl font-medium leading-[49px]'>
            404
          </h1>
          <div className='inline-block'>
            <h2 className='text-sm font-normal leading-[49px] m-0'>
              This page could not be found.
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
