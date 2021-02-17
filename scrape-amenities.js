const puppeteer = require('puppeteer');
const fs = require('fs');

async function scrapeAmenities() {
    let text = fs.readFileSync('./Apartments.txt', 'utf-8');
    let apartments = JSON.parse(text);
    const browser = await puppeteer.launch({headless: false, defaultViewport: null}); // need browser to open due to responsive website design changing xpath 
    const page = await browser.newPage();
    
    for (apartmentIndex = 66; apartmentIndex < 68; ++apartmentIndex) {            //  apartments.length // 47
      try {
        fs.unlinkSync('./ApartmentUnits/Apartments'+ apartmentIndex +'.txt');
      } catch {
        // file does not exist
      }
      await page.goto(apartments[apartmentIndex][1]);
      await page.waitFor('.rentalGridRow');
      
      let amenityList = await page.$$eval('div[data-tab-content-id="all"] .rentalGridRow', (rows) => {
        return rows.map((row) => {
          amenity = [];
          let price = row.getAttribute('data-maxrent');
          price = price.replace(/[^0-9-]/g,"");
          if (price.toString().includes('-')) {
            price = price.substring(price.toString().indexOf('-') + 1);
          }
          unit.push(price);
          let beds = row.getAttribute('data-beds');
          unit.push(beds);
          let baths = row.getAttribute('data-baths');
          unit.push(baths)
          let sqft_element = row.querySelector('.sqft');
          let sqft = sqft_element.textContent;
          sqft = sqft.replace(/[^0-9-]/g,"");
          if (sqft.toString().includes('-')) {
            sqft = sqft.substring(sqft.toString().indexOf('-') + 1);
          } else if (sqft.length == 0) {
            sqft = 'NULL';
          }
          unit.push(sqft);
          return amenity;
        });  
      });
      amenitiyList.push(apartments[apartmentIndex][2]);
      // console.log(unitList);
      // console.log(unitList[2]);
      // console.log(unitList[unitList.length - 1])
      
      fs.writeFile('./ApartmentAmenities/Apartments'+ apartmentIndex +'.txt', JSON.stringify(amenitiyList), {flag: 'a'});
    }
    await browser.close();
}
function print() {
    console.log('jwofj');
    await waitFor(1000);
    console.log('done');
}
//scrapeAmenities();
print();