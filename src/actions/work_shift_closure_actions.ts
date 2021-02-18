import {group, check} from "k6"
import http from "k6/http"
import IRrequestOptions from "../models/options"
import IReceipts from "../models/receipts"


export function LoadReceipts(options: IRrequestOptions, host: string, receiptsData:IReceipts,docId:number){
    group("Грузим чеки ", ()=>{
        const res = http.request("POST",`${host}/CashAccountingService/WorkShiftClosure/${docId}/CloseShift`,JSON.stringify(receiptsData),options)
        check( res, {
            "is status 200" : r => {
                if (r.status === 200){
                    return true
                }
                console.error(`${r.body} doc_id ${docId}`)
                return false
            },
        })
 
    })
}