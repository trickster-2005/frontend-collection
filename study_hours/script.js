let margin = 50
let iconSize = 22;
let canvasSize = 600;
let canvasWidth = 800;
let canvasHeight = 600;

const customSymbols = {
    "Happy": "./happy.svg",
    "Sad": "./sad.svg",
    "Angry": "./angry.svg"
};

async function getData(){
    dataGet = await d3.csv('./練習資料1.csv');
    scatter1(dataGet)
}

getData()

function scatter1(data){
    const svg = d3.select(".chart");

    // X軸線
    const xScale = d3.scaleLinear()
                        .domain([0,16])
                        .range([0, canvasWidth-margin*2]);

    const xAxis = d3.axisBottom(xScale);

    xAxis.tickFormat(d =>  "第" + d + "週").tickSize(0).tickPadding(15)
    
    svg.append('g')
        .attr("class", "axis")
        .attr('transform', `translate(${margin}, ${canvasHeight - margin})`)
        .call(xAxis)

    //X 格子
    const xGrid = d3.axisTop(xScale)
        .tickSize(-(canvasHeight-margin*2))
        .tickFormat("");
    
    svg.append('g')
        .attr("class", "grid")
        .attr('transform', `translate(${margin}, ${margin})`)
        .call(xGrid);


    //Y軸線
    const yScale = d3.scaleLinear()
                        .domain([0,50])
                        .range([canvasHeight-margin*2, 0]);

    const yAxis = d3.axisLeft(yScale) 
    yAxis.tickFormat(d =>  d + " hr").tickSize(0).tickPadding(8)

    svg.append('g')
            .attr("class", "axis")
            .attr('transform', `translate(${margin}, ${margin})`)
            .call(yAxis)


    // Y格子
    const yGrid = d3.axisLeft(yScale)
                    // .ticks(7)
                    .tickSize(-(canvasWidth-margin*2))
                    .tickFormat("")
                    
    svg.append('g')
        .attr("class", "grid")
        .attr('transform', `translate(${margin}, ${margin})`)
        .call(yGrid)


    

    // 點點
    const dots = svg.append('g')
                    .selectAll('image')
                    .data(data)
                    .enter()
                    .append('image')
                    .attr('xlink:href', d => customSymbols[d.Mood])
                    .attr('width', iconSize)
                    .attr('height', iconSize)
                    .attr('x', d => xScale(d.Week) + margin - iconSize/2) // 調整圖像中心
                    .attr('y', d => yScale(d["Study(hours)"]) + margin - iconSize/2); // 調整圖像中心      

    // tooltip
    const tooltip = d3.select("body")
                    .append("div")
                    .style("position", "absolute")
                    .style("visibility", "hidden") // 一開始tooltips是隱藏的
                    .style("background-color", "white")
                    .style("border", "solid")
                    .style("border-width", "1px")
                    .style("border-radius", "5px")
                    .style("padding", "10px");
                 
    
    //互動
    dots.on('mouseover', function(event, d) {
        d3.select(this)
            .transition()
            .duration(100)
            .attr('width', iconSize * 1.2)
            .attr('height', iconSize * 1.2)
            .attr('x',  d => xScale(d.Week) + margin - iconSize*1.2/2)
            .attr('y', d => yScale(d["Study(hours)"]) + margin - iconSize*1.2/2);
        
        let pt = d3.pointer(event, this)
        tooltip.style("visibility", "visible")
            .style("left", pt[0] +150 + "px")
            .style("top", pt[1] - 10 + "px")
            .html("學期第 " + d.Week +" 週，讀了" + d["Study(hours)"] + " 小時。"
                + "<br/>" + "很 " + d.Mood + " !")
    })
    .on('mouseout', function(event, d) {
        d3.select(this)
            .transition()
            .duration(100)
            .attr('width', iconSize)
            .attr('height', iconSize)
            .attr('x', d => xScale(d.Week) + margin - iconSize/2) 
            .attr('y', d => yScale(d["Study(hours)"]) + margin - iconSize/2);
        tooltip.style("visibility", "hidden")
    });

    //RWD, 調整格線樣式/字體大小粗度, 換icon
    //代碼重整
}
