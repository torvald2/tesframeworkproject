
import { options } from "k6/http"
import {LoadReceipts} from "../actions/work_shift_closure_actions"
import IReceipts from "../models/receipts"
import IOptions from "../models/options"
import dateincrement from 'k6/x/atb/dateincrement';
import numincrement from 'k6/x/atb/numericincrement';
import dateFormater from '../helpers/formatDate'
//declare var dateincrement:any

interface ITestData{
    data: IReceipts
    options:IOptions
}

//Выполняется для каждого потока. К сожалению открывать файлы можно только здесь
const LOAD_TEST_DATA="receipts.json"
const n_increment = numincrement.new(425,1)
const d_increment = dateincrement.new("2015-01-01",1)

// Выполняется единожды для теста
// Тут нельзя инициализировать классы. исключительно данные
export function setup(){
    const test_data:IReceipts = JSON.parse(LOAD_TEST_DATA)
    const options:IOptions =  {
        headers:{
            "Connection":"keep-alive",
            "Content-Type":"application/json",
            "Authorization":__ENV.API_TOKEN
        },
        cookies:{}
        }
    return {data:test_data, options:options}
}

export default function(_testData:ITestData){
    const doc_id = n_increment.get()
    const doc_date = d_increment.get()

    _testData.data.receipts.forEach(r =>r.date = dateFormater(doc_date))

    LoadReceipts(_testData.options, __ENV.BASE_URL, _testData.data, doc_id)
}