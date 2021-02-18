export  default interface IReceipts {
    shopId: number,
    employeeId:string,
    receipts:[
        {
            cashPlaceId:number,
            date:string,
            article:string,
            bar:string,
            quantity:number,
            total:number,
            price: number,
            receiptType: number,
            taxGroup:number,
            isDiscount:number,
            payType:number,
            discountId:number,
            discountSum:number,
            discountDocumentId:number,
            discountInfo:number
 
        }
    ]
 
}