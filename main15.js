
//--------Adding functionality to the buttons ---------------------//

function turnOnGDP(number){
  console.log("turnOnGDP");
  var svgStyle1 = document.getElementById("lineChart"+ number +"GDP").getAttribute("display");
  var svgStyle2 = document.getElementById("lineChart"+ number +"YEAR").getAttribute("display");

  var elemnt = document.getElementById("lineChart"+ number +"GDP");
  console.log(elemnt);
  console.log(svgStyle2);

  if (svgStyle1 == "none"){
      document.getElementById("lineChart"+ number +"GDP").setAttribute("display", "block");
      document.getElementById("lineChart"+ number +"YEAR").setAttribute("display", "none");
  }
}

function turnOnYEAR(number){
  console.log("turnOnYEAR");
  var svgStyle1 = document.getElementById("lineChart"+ number +"GDP").getAttribute("display");
  var svgStyle2 = document.getElementById("lineChart"+ number +"YEAR").getAttribute("display");

  //console.log(svgStyle1);
  //console.log(svgStyle2);

  if (svgStyle2 == "none"){
      document.getElementById("lineChart"+ number +"GDP").setAttribute("display", "none");
      document.getElementById("lineChart"+ number +"YEAR").setAttribute("display", "block");
  }
}

//--------Parsing Data ---------------------//
var dataset = d3.dsv(",", "Final_Cleaned_Data22.csv", function(d) {
    
  return {
    country: d.Country, 
    year: new Date(+d.Year, 0, 1).getFullYear(), // convert "Year" column to Date and formats it to only year.
    cellphone: parseInt(+d.Cellphone), 
    internetuser: parseInt(+d.Internetuser), 
    telephone: parseInt(+d.Telephone),
    radio: parseInt(+d.Radio), 
    xlpopulation: parseInt(+d.Xlpopulation), 
    xlrealgdp: parseInt(+d.Xlrealgdp)
  };
}).then(function(data) {
  
  //------filtering & creating datasets for each chart------//
  //var keys2 = data.columns.slice(0);
  //var name = data.country_name;
  //console.log(data.country_name);

  viz_countries = ["China","Germany","India","Japan","Russia","United States"]
  const dataEvent_2 = data.filter((d,i) => d.year >= 1920 && d.year <= 2000)
  const dataEvent_1 = data.filter((d,i) => d.year >= 1876 && d.year <= 2000)
  const dataEvent_3 = data.filter((d,i) => d.year >= 1980 && d.year <= 2000)
  const dataEvent_4 = data.filter((d,i) => d.year >= 1990 && d.year <= 2000)
  const dataEvent_5 = data.filter((d,i) => d.year >= 1960 && d.year <= 2000)
  const dataEvent_6 = data.filter((d,i) => d.year >= 1992)
  console.log(dataEvent_1);
  console.log(dataEvent_2);
  console.log(dataEvent_3);
  console.log(dataEvent_4);
  console.log(dataEvent_5);
  console.log(dataEvent_6);

//------calling the function to create multiple charts per div id ------//

  draw("#lineChart1",dataEvent_1);
  draw("#lineChart2",dataEvent_2);
  draw("#lineChart3",dataEvent_3);
  draw("#lineChart4",dataEvent_4);
  draw("#lineChart5",dataEvent_5);
  draw("#lineChart6",dataEvent_6);

  //Function for adding multiple linecharts based on dom element== selector, and the dataset that we want to visualize

  function draw(selector,dataEvents){

    // ---- Setting up variables that describe our chart's space. ----///
    var filtered_data = dataEvents;
    var margin = {top: 40, right: 20, bottom: 60, left: 40},
        width = 800 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    //--- Group the data by country : I want to draw one line per group ----//
    var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
      .key(function(d) { return d.country;})
      .entries(filtered_data);
    console.log(sumstat);

    //--- Color palette-------//
    var res = sumstat.map(function(d){ return d.key })
     // list of group names
    console.log(res);
    var color = d3.scaleOrdinal()
      .domain(res)
      .range(d3.schemeSet3);
   

//------------ GDP CHART ------------------------------------//
  console.log(selector.slice(1));
  //Add svg container for GDP graph
    var svgGDP = d3.select(selector)
      .append("svg")
        .attr("id",selector.slice(1)+"GDP")
        .attr("display","block")
        .attr("width",  width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

      //make a clip path for the graph  
      var clip = svgGDP.append("svgGDP:clipPath")
          .attr("id", "clip")
          .append("svgGDP:rect")
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", width)
          .attr("height", height);

//----------AXIS ----------------------------//
  
  //--- Add X axis
      const xScale = d3.scaleLog()
        .domain([90000, d3.max(filtered_data,(function(d) {
            return d.xlrealgdp}))]).nice()
        .range([0, width]);
  
  //----Draw x-axis       
      const xAxis = d3.axisBottom(xScale).ticks(10,"~s"); //,"~s"       
      
      svgGDP.append("svgGDP:g")
          .attr("transform", "translate(0," + height + ")")
          .attr("class","x axis")
          .call(xAxis)
          .append('text')
                .attr('text-anchor', 'end')
                .attr('fill', '#dee7fa')
                .attr('font-size', '12px')
                .attr('font-weight', 'bold')
                .attr('x', width - margin.right)
                .attr('y', -10)
                .text('GDP');
  
  //--- Add Y axis
      const yScale = d3.scaleLog()
        .domain([10, 
              d3.max(filtered_data, function(d) {            
                if (filtered_data == dataEvent_1){
                   {return d.telephone}
                }else if (filtered_data == dataEvent_2){
                  { return d.radio}
                }else if (filtered_data == dataEvent_3){
                  { return d.cellphone}
                }else if (filtered_data == dataEvent_4){
                  { return d.internetuser}
                }else if (filtered_data == dataEvent_5){
                  { return d.xlpopulation}
                }else if (filtered_data == dataEvent_6){
                  { return d.internetuser}
                };})]).nice()
        .range([height,0]);
  
  //---Draw y-axis       
      const yAxis = d3.axisLeft(yScale).ticks(20, "~s"); //,"~s"
             
      svgGDP.append("svgGDP:g")
            .attr("class","y axis")
            .call(yAxis)
            .append('text')
                .attr('transform', `translate(20, ${margin.top}) rotate(-90)`)
                .attr('text-anchor', 'end')
                .attr('fill', '#dee7fa')
                .attr('font-size', '12px')
                .attr('font-weight', 'bold')
                .text(function(d) {            
                    if (filtered_data == dataEvent_1){
                       {return "Telephone"}
                    }else if (filtered_data == dataEvent_2){
                      { return "Radio"}
                    }else if (filtered_data == dataEvent_3){
                      { return "Cellphone"}
                    }else if (filtered_data == dataEvent_4){
                      { return "Internet Users"}
                    }else if (filtered_data == dataEvent_5){
                      { return "Population"}
                    }else if (filtered_data == dataEvent_6){
                      { return "Internet Users"}
                    };});


//----Create the GDP line --------//
    const line = d3.line()
              .defined(function (d) { 
                  if (filtered_data == dataEvent_1){
                    {return d.telephone != 0 && d.xlrealgdp !=0 && d.telephone !=NaN && d.xlrealgdp !=NaN}
                  }else if (filtered_data == dataEvent_2){
                    {return d.radio != 0 && d.xlrealgdp !=0 && d.radio !=NaN && d.xlrealgdp !=NaN}
                  }else if (filtered_data == dataEvent_3){
                    {return d.cellphone != 0 && d.xlrealgdp !=0 && d.cellphone !=NaN && d.xlrealgdp !=NaN}
                  }else if (filtered_data == dataEvent_4){
                    {return d.internetuser != 0 && d.xlrealgdp !=0 && d.internetuser !=NaN && d.xlrealgdp !=NaN}
                  }else if (filtered_data == dataEvent_5){
                    {return d.xlpopulation != 0 && d.xlrealgdp !=0 && d.xlpopulation !=NaN && d.xlrealgdp !=NaN}                  
                  }else if (filtered_data == dataEvent_6){
                    {return d.internetuser != 0 && d.xlrealgdp !=0 && d.internetuser !=NaN && d.xlrealgdp !=NaN}
                  };})                    
                .x(function(d) { return xScale(d.xlrealgdp); })
                .y(function(d) {
                  if (filtered_data == dataEvent_1){
                     {return yScale(d.telephone)}
                  }else if (filtered_data == dataEvent_2){
                    { return yScale(d.radio)}
                  }else if (filtered_data == dataEvent_3){
                    { return yScale(d.cellphone)}
                  }else if (filtered_data == dataEvent_4){
                    { return yScale(d.internetuser)}
                  }else if (filtered_data == dataEvent_5){
                    { return yScale(d.xlpopulation);}
                  }else if (filtered_data == dataEvent_6){
                    { return yScale(d.internetuser)}
                  };});
 
//---------------------------TOOLTIP----------------------------//
const tooltipGDP = d3.select("#"+selector.slice(1)).append("div")
    .attr("class", "tooltip")
    .attr("id",selector.slice(1)+"GDP"+"tooltip")
    .style("opacity", 0)
    .style("color","#dee7fa")
    .style("position", "absolute");
    //.style("background-color", "white")
    //.style("border", "solid")
    //.style("border-width", "2px")
    //.style("border-radius", "5px")
    //.style("padding", "5px");

console.log(tooltipGDP);

//--- Bind the data
    var lineGraph = svgGDP.selectAll(".lineGraph")                   
          .data(sumstat);

    //var container = document.querySelector(selector+"GDP"+">g");
    //var matches = container.getElementsByClassName("lineGraph");
    //console.log(matches);

//----Append a g tag for each line and set of tooltip circles and give it a unique ID based on the column name of the data        
    var lineGraphEnter = lineGraph.enter().append("g") 
            .attr("clip-path","url(#clip)")
            .attr("class","lineGraph")
                .attr("id",function(d){return selector.slice(1)+ "GDP"+"-" + d.key + "-line";}) //assigning ID to lines based on LineChart[i]  
            .style("stroke-width",2)
            .on("mouseover",function(d){
              d3.select(this)
              .style("stroke-width","4px");

              //select all the rest of the lines, except the one you are hovering on and drop their opacity
              //using jQuery selecting method --inside the LineChart[i]--> get elements with classname=lineGraph       
              var selectlineGraphs = $(selector).find(".lineGraph").not(this); 
              console.log(selectlineGraphs);
              d3.selectAll(selectlineGraphs)
                .style("opacity",0.2);

              //connect line mouseover to legend 
              //using the IDs get the legend elements per LineChart[i]
              var getcountry = document.getElementById(selector.slice(1)+ "GDP"+"-" + d.key);
              //var getcountry = $(selector).find("#"+d.key);
              console.log(getcountry);
              var selectlegend = $(selector).find('.legend').not(getcountry);
              d3.selectAll(selectlegend)    // drop opacity on other legend names
                .style("opacity",0.2);
              d3.select(getcountry)
                .attr("class", "legend-select");  //change the class on the legend name that corresponds to hovered line to be bolder         
               
            })
            .on("mouseout", function(d) {        //undo everything on the mouseout
              //lines
              d3.select(this)
                .style("stroke-width",'3.5px');
              var selectlineGraphs = $(selector).find(".lineGraph").not(this);
              d3.selectAll(selectlineGraphs)
                .style("opacity",1);
              
              //legend
              var getcountry = document.getElementById(selector.slice(1)+"GDP"+ "-" + d.key);
              var getcountry2= $('.legend[fakeclass="fakelegend"]')
              var selectlegend = $('.legend').not(getcountry2).not(getcountry);
              d3.selectAll(selectlegend)
                .style("opacity",1);        
              d3.select(getcountry)
                .attr("class", "legend");}); 

   

                
  // Draw the lines
    lineGraphEnter.append("path")
      .attr("class", "line")
          //.attr('marker-end', 'url(#arrow)')
          .attr("fill", "none")
          .attr("stroke",function(d){ return color(d.key) })
          .attr("d", function(d){ return line(d.values)});   
//-------POINTS-------------------------------------------------------//
    var circles=lineGraphEnter.selectAll("points")
          .data(function(d){return d.values})
          .enter()
          .append("circle")
          .attr("cx", function(d){ 
                  if (filtered_data == dataEvent_1){   
                      if(d.telephone != '0' && d.xlrealgdp!='0'){
                        {return xScale(d.xlrealgdp)}}
                  }else if (filtered_data == dataEvent_2){
                        if(d.radio != '0'&& d.xlrealgdp!='0'){
                        {return xScale(d.xlrealgdp)}}
                  }else if (filtered_data == dataEvent_3){
                      if(d.cellphone != '0'&& d.xlrealgdp!='0'){
                      {return xScale(d.xlrealgdp)}}
                  }else if (filtered_data == dataEvent_4){
                    if(d.internetuser != '0'&& d.xlrealgdp!='0'){
                    { return xScale(d.xlrealgdp)}}
                  }else if (filtered_data == dataEvent_5){
                    if(d.xlpopulation != '0'&& d.xlrealgdp!='0'){
                    { return xScale(d.xlrealgdp)}}
                  }else if (filtered_data == dataEvent_6){
                    if(d.internetuser != '0'&& d.xlrealgdp!='0'){
                    {return xScale(d.xlrealgdp)}}
                  };})    
          .attr("cy", function(d) {
                  if (filtered_data == dataEvent_1){   
                      if(d.telephone != '0' && d.xlrealgdp!='0'){
                        // console.log("d.telephone")
                        // console.log(d.telephone)
                        {return yScale(d.telephone)}}
                  }else if (filtered_data == dataEvent_2){
                        if(d.radio != '0'){
                        {return yScale(d.radio)}}
                  }else if (filtered_data == dataEvent_3){
                      if(d.cellphone != '0'){
                      {return yScale(d.cellphone)}}
                  }else if (filtered_data == dataEvent_4){
                    if(d.internetuser != '0'){
                    { return yScale(d.internetuser)}}
                  }else if (filtered_data == dataEvent_5){
                    if(d.xlpopulation != '0'){
                    { return yScale(d.xlpopulation);}}
                  }else if (filtered_data == dataEvent_6){
                    if(d.internetuser != '0'){
                    {return yScale(d.internetuser)}}
                  };})    
          .attr("r", 1)
          .attr("fill",function(d){return color(d.country)})
          .attr("class","point")
          .style("opacity", 1);

//---------------------------TOOLTIP-----------------------------//    
lineGraphEnter.selectAll("circles")
    .data(function(d) { return(d.values); } )
    .enter()
    .append("circle")
    .attr("cx", function(d){ 
                  if (filtered_data == dataEvent_1){   
                      if(d.telephone != '0' && d.xlrealgdp!='0'){
                        {return xScale(d.xlrealgdp)}}
                  }else if (filtered_data == dataEvent_2){
                        if(d.radio != '0'&& d.xlrealgdp!='0'){
                        {return xScale(d.xlrealgdp)}}
                  }else if (filtered_data == dataEvent_3){
                      if(d.cellphone != '0'&& d.xlrealgdp!='0'){
                      {return xScale(d.xlrealgdp)}}
                  }else if (filtered_data == dataEvent_4){
                    if(d.internetuser != '0'&& d.xlrealgdp!='0'){
                    { return xScale(d.xlrealgdp)}}
                  }else if (filtered_data == dataEvent_5){
                    if(d.xlpopulation != '0'&& d.xlrealgdp!='0'){
                    { return xScale(d.xlrealgdp)}}
                  }else if (filtered_data == dataEvent_6){
                    if(d.internetuser != '0'&& d.xlrealgdp!='0'){
                    {return xScale(d.xlrealgdp)}}
                  };})    
          .attr("cy", function(d) {
                  if (filtered_data == dataEvent_1){   
                      if(d.telephone != '0' && d.xlrealgdp!='0'){
                        // console.log("d.telephone")
                        // console.log(d.telephone)
                        {return yScale(d.telephone)}}
                  }else if (filtered_data == dataEvent_2){
                        if(d.radio != '0'&& d.xlrealgdp!='0'){
                        {return yScale(d.radio)}}
                  }else if (filtered_data == dataEvent_3){
                      if(d.cellphone != '0'&& d.xlrealgdp!='0'){
                      {return yScale(d.cellphone)}}
                  }else if (filtered_data == dataEvent_4){
                    if(d.internetuser != '0'&& d.xlrealgdp!='0'){
                    { return yScale(d.internetuser)}}
                  }else if (filtered_data == dataEvent_5){
                    if(d.xlpopulation != '0'&& d.xlrealgdp!='0'){
                    { return yScale(d.xlpopulation);}}
                  }else if (filtered_data == dataEvent_6){
                    if(d.internetuser != '0'&& d.xlrealgdp!='0'){
                    {return yScale(d.internetuser)}}
                  };})    
    .attr('r', 12)
    .style("opacity", 0)
    .on('mouseover', function(d) {      
      // tooltip -- text appear on mouseover
        tooltipGDP.transition()
            .delay(30)
            .duration(200)
            .style("opacity", 1);
        tooltipGDP.html("Year: "+d.year)
            .style("left", (d3.event.pageX + 25) + "px")
            .style("top", (d3.event.pageY) + "px");
        console.log(tooltipGDP.html("Year: "+d.year));

      // points appear on mouseover
        const selection = d3.select(this).raise();

        selection
            .transition()
            .delay("20")
            .duration("200")
            .attr("r", 5)
            .style("opacity", 1)
            .style("fill",function(d){ return color(d.country)});
        console.log(color(d.key))
    })                
    .on("mouseout", function(d) {      
      // points disappear on mouseout
        tooltipGDP.transition()        
            .duration(100)      
            .style("opacity", 0); 

      // points disappear on mouseout
        const selection = d3.select(this);

        selection
            .transition()
            .delay("20")
            .duration("200")
            .attr("r", 5)
            .style("opacity", 0);
    });

//---------------LEGEND----------------------------------------//
   //Append the legend
    var legend = svgGDP.selectAll('.legend')
        .data(sumstat);
    
    var legendEnter = legend
        .enter()
        .append('g')
        .attr('class', 'legend')
        .attr('id',function(d){ return selector.slice(1)+ "GDP"+"-" + d.key; })
        .on('click', function (d) {                           //onclick function to toggle off the lines          
          if($(this).css("opacity") == 1){          //uses the opacity of the item clicked on to determine whether to turn the line on or off         
             
            var elemented = document.getElementById(this.id +"-line");   //grab the line that has the same ID as this point along w/ "-line"  use get element cause ID has spaces
            d3.select(elemented)
              .transition()
              .duration(200)
              .style("opacity",0)
              .style("display",'none');
          
            d3.select(this)
              .attr('fakeclass', 'fakelegend')
            .transition()
              .duration(200)
              .style ("opacity", .2);

        
          } else {
          
            var elemented = document.getElementById(this.id +"-line");
            d3.select(elemented)
              .style("display", "block")
              .transition()
              .duration(200)
              .style("opacity",1);
          
            d3.select(this)
              .attr('fakeclass','legend')
              .transition()
              .duration(200)
              .style ("opacity", 1); 
              }
    });

    //Add the rectangles to the created legend container
      var size = 12;  
      legendEnter.append("rect")
          .attr("x", function(d,i){ return 200 + i*(size+50)})
          .attr("y", 430) // 430 is where the first rect appears. 
          .attr("width", size)
          .attr("height", size)
          .style("fill", function(d){ return color(d.key)});
    
                 
    //Add the legend text
      legendEnter.append('text')
          .attr("x", function(d,i){ return 200 + i*(size+50) } ) 
          .attr("y", 430 + size*1.2 +10) // 430 is where the first rect appears. plus the distance between rect
          .style("fill", function(d){ return color(d.key)})
          .text(function(d){ return d.key})
          .attr("text-anchor", "left")
          .style("alignment-baseline", "middle");

    //Add the legend title
      legendEnter.append('text')
          .attr("x", 0) 
          .attr("y", 435) 
          .style("fill", "#dee7fa")
          .text("CLICK TO FILTER BY COUNTRY: ")
          .attr("font-weight","bold")
          .attr("text-anchor", "left")
          .style("alignment-baseline", "middle"); 

  // update the axes,   
    d3.transition(svgGDP).select(".y.axis")
      .call(yAxis);   
          
    d3.transition(svgGDP).select(".x.axis")
      .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

   
///////----------------------------------------------------------------------------////////

//--------------------YEAR CHART --------------------------------------------//

    var svgYEAR = d3.select(selector)
      .append("svg")
        .attr("id", selector.slice(1)+"YEAR")
        .attr("display","none")
        .attr("width",  width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

    //make a clip path for the graph  
      var clip = svgYEAR.append("svgYEAR:clipPath")
          .attr("id", "clip")
          .append("svgYEAR:rect")
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", width)
          .attr("height", height);

//----------AXIS ----------------------------//
      //Add X axis
      var x = d3.scaleLinear()
        .domain(d3.extent(filtered_data,(function(d) {
            return d.year
       }))).nice()
        .range([0, width]);
     svgYEAR.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).ticks(5))
        .append('text')
          .attr('text-anchor', 'end')
          .attr('fill', '#dee7fa')
          .attr('font-size', '12px')
          .attr('font-weight', 'bold')
          .attr('x', width - margin.right)
          .attr('y', -10)
          .text('YEAR');

    // ---Add Y axis
        //d3.scaleSymLog()...?
        var y = d3.scaleLog()
          .domain([10, d3.max(filtered_data, function(d) {            
                  if (filtered_data == dataEvent_1){
                     {return d.telephone}
                  }else if (filtered_data == dataEvent_2){
                    { return d.radio}
                  }else if (filtered_data == dataEvent_3){
                    { return d.cellphone}
                  }else if (filtered_data == dataEvent_4){
                    { return d.internetuser}
                  }else if (filtered_data == dataEvent_5){
                    { return d.xlpopulation}
                  }else if (filtered_data == dataEvent_6){
                    { return d.internetuser}
                  };})]).nice()
          .range([height,0]);
        svgYEAR.append("svgYEAR:g")
          .call(d3.axisLeft(y).ticks(10,"~s")) //,"~s"
          .append('text')
              .attr('transform', `translate(20, ${margin.top}) rotate(-90)`)
              .attr('text-anchor', 'end')
              .attr('fill', '#dee7fa')
              .attr('font-size', '12px')
              .attr('font-weight', 'bold')
              .text(function(d) {            
                  if (filtered_data == dataEvent_1){
                     {return "Telephone"}
                  }else if (filtered_data == dataEvent_2){
                    { return "Radio"}
                  }else if (filtered_data == dataEvent_3){
                    { return "Cellphone"}
                  }else if (filtered_data == dataEvent_4){
                    { return "Internet Users"}
                  }else if (filtered_data == dataEvent_5){
                    { return "Population"}
                  }else if (filtered_data == dataEvent_6){
                    { return "Internet Users"}
                  };});   



    //----------LINES -----------------------------//

    const lineYear = d3.line()
            .defined(function (d) { 
                    if (filtered_data == dataEvent_1){
                      {return d.telephone != 0 && d.year !=0 && d.telephone !=NaN && d.year !=NaN}
                      
                    }else if (filtered_data == dataEvent_2){
                      {return d.radio != 0 && d.year !=0 && d.radio !=NaN && d.year !=NaN}

                    }else if (filtered_data == dataEvent_3){
                      {return d.cellphone != 0 && d.year !=0 && d.cellphone !=NaN && d.year !=NaN}

                    }else if (filtered_data == dataEvent_4){
                      {return d.internetuser != 0 && d.year !=0 && d.internetuser !=NaN && d.year !=NaN}

                    }else if (filtered_data == dataEvent_5){
                      {return d.xlpopulation != 0 && d.year !=0 && d.xlpopulation !=NaN && d.year !=NaN}
                    
                    }else if (filtered_data == dataEvent_6){
                      {return d.internetuser != 0 && d.year !=0 && d.internetuser !=NaN && d.year !=NaN}

                    };})
              .x(function(d) { return x(d.year); })
              
              .y(function(d) {
                  if (filtered_data == dataEvent_1){
                     {return y(d.telephone)}
                  }else if (filtered_data == dataEvent_2){
                    { return y(d.radio)}
                  }else if (filtered_data == dataEvent_3){
                    { return y(d.cellphone)}
                  }else if (filtered_data == dataEvent_4){
                    { return y(d.internetuser)}
                  }else if (filtered_data == dataEvent_5){
                    { return y(d.xlpopulation);}
                  }else if (filtered_data == dataEvent_6){
                    { return y(d.internetuser)}
                  };});
  //---------------------------TOOLTIP----------------------------//
    const tooltipYEAR = d3.select("#"+selector.slice(1)).append("div")
        .attr("class", "tooltip")
        .attr("id",selector.slice(1)+"YEAR"+"tooltip")
        .style("opacity", 0)
        .style("color","#dee7fa")
        .style("position", "absolute")
        .style("padding","10px");
        //.style("background-color", "white")
        //.style("border", "solid")
        //.style("border-width", "2px")
        //.style("border-radius", "5px")
        //.style("padding", "5px");

    console.log(tooltipYEAR);

    //--- Bind the data --Maybe i need to change lineGraph
    var lineGraph = svgYEAR.selectAll(".lineGraph")                   
          .data(sumstat);


    //----Append a g tag for each line and set of tooltip circles and give it a unique ID based on the column name of the data        
    var lineGraphEnter = lineGraph.enter().append("g") 
            .attr("clip-path","url(#clip)")
            .attr("class","lineGraph")
                .attr("id",function(d){return selector.slice(1)+"YEAR"+ "-" + d.key + "-line";}) //assigning ID to lines based on LineChart[i]  
            .style("stroke-width",1)
            .on("mouseover",function(d){
              d3.select(this)
              .style("stroke-width","8px");

              //select all the rest of the lines, except the one you are hovering on and drop their opacity
              //using jQuery selecting method --inside the LineChart[i]--> get elements with classname=lineGraph       
              var selectlineGraphs = $(selector).find(".lineGraph").not(this); 
              console.log(selectlineGraphs);
              d3.selectAll(selectlineGraphs)
                .style("opacity",0.2);

              //connect line mouseover to legend 
              //using the IDs get the legend elements per LineChart[i]
              var getcountry = document.getElementById(selector.slice(1)+ "YEAR"+"-" + d.key);
              //var getcountry = $(selector).find("#"+d.key);
              console.log(getcountry);
              var selectlegend = $(selector).find('.legend').not(getcountry);
              d3.selectAll(selectlegend)    // drop opacity on other legend names
                .style("opacity",0.2);
              d3.select(getcountry)
                .attr("class", "legend-select");  //change the class on the legend name that corresponds to hovered line to be bolder         
              
    
            })
            .on("mouseout", function(d) {        //undo everything on the mouseout
              //lines
              d3.select(this)
                .style("stroke-width",'3.5px');
              var selectlineGraphs = $(selector).find(".lineGraph").not(this);
              d3.selectAll(selectlineGraphs)
                .style("opacity",1);
              
              //legend
              var getcountry = document.getElementById(selector.slice(1)+ "YEAR"+"-" + d.key);
              var getcountry2= $('.legend[fakeclass="fakelegend"]')
              var selectlegend = $('.legend').not(getcountry2).not(getcountry);
              d3.selectAll(selectlegend)
                .style("opacity",1);        
              d3.select(getcountry)
                .attr("class", "legend");}); 

  // Draw the lines
    lineGraphEnter.append("path")
      .attr("class", "line")
          .attr("fill", "none")
          .attr("stroke",function(d){ return color(d.key) })
          .attr("d", function(d){ return lineYear(d.values)}); 

//-------POINTS-------------------------------------------------------//
    var circles=lineGraphEnter.selectAll("points")
          .data(function(d){return d.values})
          .enter()
          .append("circle")
          .attr("cx", function(d){ 
                  if (filtered_data == dataEvent_1){   
                      if(d.telephone != '0' && d.year!='0'){
                        {return x(d.year)}}
                  }else if (filtered_data == dataEvent_2){
                        if(d.radio != '0'&& d.year!='0'){
                        {return x(d.year)}}
                  }else if (filtered_data == dataEvent_3){
                      if(d.cellphone != '0'&& d.year!='0'){
                      {return x(d.year)}}
                  }else if (filtered_data == dataEvent_4){
                    if(d.internetuser != '0'&& d.year!='0'){
                    { return x(d.year)}}
                  }else if (filtered_data == dataEvent_5){
                    if(d.xlpopulation != '0'&& d.year!='0'){
                    { return x(d.year)}}
                  }else if (filtered_data == dataEvent_6){
                    if(d.internetuser != '0'&& d.year!='0'){
                    {return x(d.year)}}
                  };})    
          .attr("cy", function(d) {
                  if (filtered_data == dataEvent_1){   
                      if(d.telephone != '0' && d.year!='0'){
                        {return y(d.telephone)}}
                  }else if (filtered_data == dataEvent_2){
                        if(d.radio != '0'&& d.year!='0'){
                        {return y(d.radio)}}
                  }else if (filtered_data == dataEvent_3){
                      if(d.cellphone != '0'&& d.year!='0'){
                      {return y(d.cellphone)}}
                  }else if (filtered_data == dataEvent_4){
                    if(d.internetuser != '0'&& d.year!='0'){
                    { return y(d.internetuser)}}
                  }else if (filtered_data == dataEvent_5){
                    if(d.xlpopulation != '0'&& d.year!='0'){
                    { return y(d.xlpopulation);}}
                  }else if (filtered_data == dataEvent_6){
                    if(d.internetuser != '0'&& d.year!='0'){
                    {return y(d.internetuser)}}
                  };})    
          .attr("r", 1)
          .attr("fill",function(d){return color(d.country)})
          .attr("class","point")
          .style("opacity", 1);
//---------------------------TOOLTIP-----------------------------//    
    lineGraphEnter.selectAll("circles")
          .data(function(d){return d.values})
          .enter()
          .append("circle")
          .attr("cx", function(d){ 
                  if (filtered_data == dataEvent_1){   
                      if(d.telephone != '0' && d.year!='0'){
                        {return x(d.year)}}
                  }else if (filtered_data == dataEvent_2){
                        if(d.radio != '0'&& d.year!='0'){
                        {return x(d.year)}}
                  }else if (filtered_data == dataEvent_3){
                      if(d.cellphone != '0'&& d.year!='0'){
                      {return x(d.year)}}
                  }else if (filtered_data == dataEvent_4){
                    if(d.internetuser != '0'&& d.year!='0'){
                    { return x(d.year)}}
                  }else if (filtered_data == dataEvent_5){
                    if(d.xlpopulation != '0'&& d.year!='0'){
                    { return x(d.year)}}
                  }else if (filtered_data == dataEvent_6){
                    if(d.internetuser != '0'&& d.year!='0'){
                    {return x(d.year)}}
                  };})    
          .attr("cy", function(d) {
                  if (filtered_data == dataEvent_1){   
                      if(d.telephone != '0' && d.year!='0'){
                        {return y(d.telephone)}}
                  }else if (filtered_data == dataEvent_2){
                        if(d.radio != '0'&& d.year!='0'){
                        {return y(d.radio)}}
                  }else if (filtered_data == dataEvent_3){
                      if(d.cellphone != '0'&& d.year!='0'){
                      {return y(d.cellphone)}}
                  }else if (filtered_data == dataEvent_4){
                    if(d.internetuser != '0'&& d.year!='0'){
                    { return y(d.internetuser)}}
                  }else if (filtered_data == dataEvent_5){
                    if(d.xlpopulation != '0'&& d.year!='0'){
                    { return y(d.xlpopulation);}}
                  }else if (filtered_data == dataEvent_6){
                    if(d.internetuser != '0'&& d.year!='0'){
                    {return y(d.internetuser)}}
                  };})    
          .attr("r", 12)
          //.attr("fill",function(d){return color(d.country)})
          .style("opacity", 0)
          .on('mouseover', function(d) {  

              if (filtered_data == dataEvent_1){   
                      if(d.telephone != '0' && d.year!='0'){
                        // tooltip -- text appear on mouseover
                        tooltipYEAR.transition()
                            .delay(30)
                            .duration(200)
                            .style("opacity", 1);
                        tooltipYEAR.html("Telephone Users:  "+d.telephone)
                            .style("left", (d3.event.pageX + 25) + "px")
                            .style("top", (d3.event.pageY) + "px");
                        console.log(tooltipYEAR.html("Telephone Users: "+d.telephone));
                        }
                  }else if (filtered_data == dataEvent_2){
                        if(d.radio != '0'&& d.year!='0'){
                          // tooltip -- text appear on mouseover
                          tooltipYEAR.transition()
                              .delay(30)
                              .duration(200)
                              .style("opacity", 1);
                          tooltipYEAR.html("Radio Users = "+d.radio)
                              .style("left", (d3.event.pageX + 25) + "px")
                              .style("top", (d3.event.pageY) + "px");
                          console.log(tooltipYEAR.html("Radio Users: "+d.radio));
                        }
                  }else if (filtered_data == dataEvent_3){
                      if(d.cellphone != '0'&& d.year!='0'){
                          // tooltip -- text appear on mouseover
                          tooltipYEAR.transition()
                              .delay(30)
                              .duration(200)
                              .style("opacity", 1);
                          tooltipYEAR.html("Cellphone Users = "+d.cellphone)
                              .style("left", (d3.event.pageX + 25) + "px")
                              .style("top", (d3.event.pageY) + "px");
                          console.log(tooltipYEAR.html("Cellphone Users: "+d.cellphone));
                      }
                  }else if (filtered_data == dataEvent_4){
                    if(d.internetuser != '0'&& d.year!='0'){
                        // tooltip -- text appear on mouseover
                          tooltipYEAR.transition()
                              .delay(30)
                              .duration(200)
                              .style("opacity", 1);
                          tooltipYEAR.html("Internet Users = "+d.internetuser)
                              .style("left", (d3.event.pageX + 25) + "px")
                              .style("top", (d3.event.pageY) + "px");
                          console.log(tooltipYEAR.html("Internet Users: "+d.internetuser));
                    }
                  }else if (filtered_data == dataEvent_5){
                    if(d.xlpopulation != '0'&& d.year!='0'){
                      // tooltip -- text appear on mouseover
                          tooltipYEAR.transition()
                              .delay(30)
                              .duration(200)
                              .style("opacity", 1);
                          tooltipYEAR.html("Population = "+d.xlpopulation)
                              .style("left", (d3.event.pageX + 25) + "px")
                              .style("top", (d3.event.pageY) + "px");
                          console.log(tooltipYEAR.html("Population: "+d.xlpopulation));
                    }
                  }else if (filtered_data == dataEvent_6){
                    if(d.internetuser != '0'&& d.year!='0'){
                    // tooltip -- text appear on mouseover
                          tooltipYEAR.transition()
                              .delay(30)
                              .duration(200)
                              .style("opacity", 1);
                          tooltipYEAR.html("Internet Users = "+d.internetuser)
                              .style("left", (d3.event.pageX + 25) + "px")
                              .style("top", (d3.event.pageY) + "px");
                          console.log(tooltipYEAR.html("Internet Users: "+d.internetuser));


                    };};   
              

              // points appear on mouseover
                const selection = d3.select(this).raise();

                selection
                    .transition()
                    .delay("20")
                    .duration("200")
                    .attr("r", 5)
                    .style("opacity", 1)
                    .style("fill",function(d){ return color(d.country)});
                console.log(color(d.key))
            })                
          .on("mouseout", function(d) {      
              // points disappear on mouseout
                tooltipYEAR.transition()        
                    .duration(100)      
                    .style("opacity", 0); 
              // points disappear on mouseout
                const selection = d3.select(this);

                selection
                    .transition()
                    .delay("20")
                    .duration("200")
                    .attr("r", 5)
                    .style("opacity", 0);
            });

  //---------------LEGEND----------------------------------------//
   //Append the legend
    var legend = svgYEAR.selectAll('.legend')
        .data(sumstat);
    
    var legendEnter = legend
        .enter()
        .append('g')
        .attr('class', 'legend')
        .attr('id',function(d){ return selector.slice(1)+ "YEAR"+"-" + d.key; })
        .on('click', function (d) {                           //onclick function to toggle off the lines          
          if($(this).css("opacity") == 1){          //uses the opacity of the item clicked on to determine whether to turn the line on or off         
             
            var elemented = document.getElementById(this.id +"-line");   //grab the line that has the same ID as this point along w/ "-line"  use get element cause ID has spaces
            d3.select(elemented)
              .transition()
              .duration(200)
              .style("opacity",0)
              .style("display",'none');
          
            d3.select(this)
              .attr('fakeclass', 'fakelegend')
            .transition()
              .duration(200)
              .style ("opacity", .2);

        
          } else {
          
            var elemented = document.getElementById(this.id +"-line");
            d3.select(elemented)
              .style("display", "block")
              .transition()
              .duration(200)
              .style("opacity",1);
          
            d3.select(this)
              .attr('fakeclass','legend')
              .transition()
              .duration(200)
              .style ("opacity", 1); 
              }
    });

    //Add the rectangles to the created legend container
      var size = 12;  
      legendEnter.append("rect")
          .attr("x", function(d,i){ return 200 + i*(size+50)})
          .attr("y", 430) // 100 is where the first dot appears. 25 is the distance between dots
          .attr("width", size)
          .attr("height", size)
          .style("fill", function(d){ return color(d.key)});
    
                 
    //Add the legend text
      legendEnter.append('text')
          .attr("x", function(d,i){ return 200 + i*(size+50) } ) 
          .attr("y", 430 + size*1.2 +10) // 100 is where the first dot appears. 25 is the distance between dots
          .style("fill", function(d){ return color(d.key)})
          .text(function(d){ return d.key})
          .attr("text-anchor", "left")
          .style("alignment-baseline", "middle");

    //Add the legend title
      legendEnter.append('text')
          .attr("x", 0) 
          .attr("y", 435) // 430 is where the first rect appears. 
          .style("fill", "#dee7fa")
          .text("CLICK TO FILTER BY COUNTRY: ")
          .attr("font-weight","bold")
          .attr("text-anchor", "left")
          .style("alignment-baseline", "middle");

  }

  });
  