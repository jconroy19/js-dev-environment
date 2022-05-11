import c3 from "c3"
import { chart } from "c3";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
window.loadChart = function (json){
  // console.log(json);
  const obj = JSON.parse(json);
  // console.log(obj);

  //two ways to extract variables from object
  //const type = obj.type;
  //const columns = obj.data;
  //or slicker way below also could use

const { type, data } = obj;

  var chart = c3.generate({
    grid: {
      x: {
        show: true
      }
    },
    size: {
      width: 640,
      height: 800,
    },
    legend: {
      //hide: 'Apples',
      position: 'right'
    },
    bindto: '#chart',
    tooltip: {
      grouped: false
    },
    axis: {
      x: {
    type: 'category',
    },
  },
    data: {
      onclick: function (clickedData) { 
          // console.log(clickedData);
          const { id, index, value } = clickedData;
          const month = months[index];
          // console.log(id, index, month);
          // const obj = { id: clickedData.id, month: months[clickedData.index] };
          const object = { id, month, value };
          console.log(object);

          FileMaker.PerformScript("Get Data", JSON.stringify(object));
      },
      x: "x",
      type: type,
      columns: data,
    },
  });
// transform chart api ("window." means available for use to filemaker)
window.transformChart = function (type) {
  chart.transform(type);
}

window.reloadData = function (data){
  const columns = JSON.parse(data);
  console.log(data);
  chart.load ({
    columns: columns,
    //unload: ["data2", "data3"],
  });
};

window.stackChart = function (){
  chart.groups([["Apples", "Peaches", "Strawberries"]])
}

}