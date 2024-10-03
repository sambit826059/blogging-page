
export const TextEditor = ({ onChange }: { onChange: (e.ChangeEvent<HTMLTextAreaElement>) }) => {
  return (
    <>
      <form>
        <div className="w-full mb-4 border border-gray-300 rounded-lg bg-white">
          <div className="flex items-center justify-between px-3 py-2 border-b border-gray-300">
            <div className="flex flex-wrap items-center divide-gray-300 sm:divide-x sm:rtl:divide-x-reverse">
              <div className="flex items-center space-x-1 rtl:space-x-reverse sm:pe-4">
              </div>
            </div>
          </div>
          <textarea onChange={onChange} className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none" rows={8} placeholder="Write something..."></textarea>
        </div>
      </form>
    </>
  );
};
