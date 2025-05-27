import React from 'react'

function CardContent() {
  return (
    <div>
      <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <div className="text-left">
              <p className="text-sm tracking-widest">6037 6915 3542 9874</p>
              <p className="text-xs text-gray-500">
                IR12 5456 5585 9688 4512 2245
              </p>
            </div>
            <div className="text-right text-sm">محمد یاسین بحرینی</div>
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <p>تاریخ انقضا: 04/12</p>
            <p>CVV2: 1245</p>
          </div>
        </div>
    </div>
  )
}

export default CardContent
