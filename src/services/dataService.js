 export default class DataService {
    constructor() {
        this._apiBase = 'http://www.filltext.com';
    }

   getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);
    
        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    };
    getSmallAmount = async () => {
        const res = await this.getResource('/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}');
        return res.map(this._transformData.bind(this))
    }
    getBigAmount = async () => {
        const res = await this.getResource('/?rows=50&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}');
        return res.map(this._transformData.bind(this))
    }


    checkData = (prop) => {
        return prop=== '' ? prop = 'No Data' : prop; 
    }

    _transformData(item) {
        return {
            id: this.checkData(item.id),
            firstName:  this.checkData(item.firstName),
            lastName:  this.checkData(item.lastName),
            email:  this.checkData(item.email),
            phone:  this.checkData(item.phone),
            address: {...item.address},
            description: this.checkData(item.description)
        }
    }

   
}



  