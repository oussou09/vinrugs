// components/admin/ContactReply.js
export default function ContactReply() {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl shadow border border-[#eddcc9] p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
          <div>
            <h3 className="font-semibold text-[#7B542F]">Custom rug inquiry</h3>
            <p className="text-sm text-gray-500">from Laura Smith (laura@example.com) • 2 hours ago</p>
          </div>
          <span className="text-xs bg-[#fdf6ec] text-[#B6771D] px-2 py-1 rounded-full mt-1 sm:mt-0">Unread</span>
        </div>
        <p className="text-sm text-gray-700 mb-4">Hi, I need a custom 8x10 Persian rug in blue tones...</p>
        <div className="flex space-x-3">
          <textarea
            className="flex-1 p-3 border border-[#d4c4a8] rounded-lg text-sm focus:ring-2 focus:ring-[#FF9D00] focus:border-transparent outline-none resize-none"
            placeholder="Write a reply..."
            rows="2"
          />
          <button className="px-4 py-2 bg-[#FF9D00] text-white rounded-lg hover:bg-[#b8871a] text-sm self-end">
            Send
          </button>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow border border-[#eddcc9] p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
          <div>
            <h3 className="font-semibold text-[#7B542F]">Return request</h3>
            <p className="text-sm text-gray-500">from James Wilson (james@example.com) • 1 day ago</p>
          </div>
          <span className="text-xs bg-[#fdf6ec] text-[#B6771D] px-2 py-1 rounded-full mt-1 sm:mt-0">Unread</span>
        </div>
        <p className="text-sm text-gray-700 mb-4">I received the wrong rug color, would like to exchange...</p>
        <div className="flex space-x-3">
          <textarea
            className="flex-1 p-3 border border-[#d4c4a8] rounded-lg text-sm focus:ring-2 focus:ring-[#FF9D00] focus:border-transparent outline-none resize-none"
            placeholder="Write a reply..."
            rows="2"
          />
          <button className="px-4 py-2 bg-[#FF9D00] text-white rounded-lg hover:bg-[#b8871a] text-sm self-end">
            Send
          </button>
        </div>
      </div>
    </div>
  )
}