const puppeteer = require('puppeteer');
const fs = require('fs');

async function scrapeAmenities() {
  let text = fs.readFileSync('./Apartments.txt', 'utf-8');
  let apartments = JSON.parse(text);
  const browser = await puppeteer.launch({headless: false, defaultViewport: null}); // need browser to open due to responsive website design changing xpath 
  const page = await browser.newPage();
  
  for (apartmentIndex = 92; apartmentIndex < apartments.length; ++apartmentIndex) {            //  apartments.length
    await page.waitForTimeout( (5 + Math.floor(Math.random()*10)) * 1000 ); // 5 to 14 seconds
    await page.goto(apartments[apartmentIndex][1]);

    await page.waitForSelector('section.specGroup.js-specGroup div.specList.js-spec');
    amenityList = [];
    amenityList.push(apartments[apartmentIndex][2]);
    
    try {
      let amenity_about = await page.$eval('section.descriptionSection.js-viewAnalyticsSection', (row) => {
        let about = row.querySelector('p');
        about = about.textContent.trim(); 
        return about;
      });
      amenityList.push(amenity_about);
    } catch(error) {
        amenityList.push("")
    }

    try {
      let amenity_fees = await page.$eval('div.feesWrapper .freeUtilities', (row) => {
        let fees = row.querySelector('.descriptionWrapper');
        fees = fees.textContent.replace(/included/gi, "").trim();
        return fees;
      });
      amenityList.push(amenity_fees);
    } catch(error) {
        amenityList.push("")
    }

    let amenityList_temp = await page.$$eval('section.specGroup.js-specGroup div.specList.js-spec', (rows) => {
      return rows.map((row) => {
        amenity = [];
        let title_element = row.querySelector('h3');
        let title = title_element.textContent;
        amenity.push(title);

        amenity_items = [];
        let title_amenities_h4 = row.querySelectorAll('h4');
        title_amenities_h4 = Array.from(title_amenities_h4, (list_item) =>  {
          if (list_item.textContent.substring(0,1) == '•') {
            list_item.textContent = list_item.textContent.substring(1).trim();
          }
          return list_item.textContent.trim();
        });
        amenity_items = amenity_items.concat(title_amenities_h4);
        let title_amenities_p = row.querySelectorAll('p');
        title_amenities_p = Array.from(title_amenities_p, (list_item) =>  {
          if (list_item.textContent.substring(0,1) == '•') {
            list_item.textContent = list_item.textContent.substring(1).trim();
          }
          return list_item.textContent.trim();
        });
        amenity_items = amenity_items.concat(title_amenities_p);
        let title_amenities_li = row.querySelectorAll('li');
        title_amenities_li = Array.from(title_amenities_li, (list_item) =>  {
          if (list_item.textContent.substring(0,1) == '•') {
            list_item.textContent = list_item.textContent.substring(1).trim();
          }
          return list_item.textContent.trim();
        });
        amenity_items = amenity_items.concat(title_amenities_li);
        
        amenity.push(amenity_items);
        return amenity;
      });  
    });
    amenityList = amenityList.concat(amenityList_temp);
    
    fs.writeFileSync('./ApartmentAmenities/Apartments' + apartmentIndex + '.txt', JSON.stringify(amenityList));
  }
  await browser.close();
}