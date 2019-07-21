var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d');
var lineWidth = 3
// var circleColor

autoSetCanvasSize(yyy)
listenToUser(yyy)


var eraserEnabled = false
pen.onclick = function () {
    eraserEnabled = false
    pen.classList.add('active')
    eraser.classList.remove('active')
}
eraser.onclick = function () {
    eraserEnabled = true
    eraser.classList.add('active')
    pen.classList.remove('active')
}

// 清屏：画一个和 canvas 相同大小的矩形覆盖 canvas
clear.onclick = function () {
    context.clearRect(0, 0, yyy.width, yyy.height);
}

// 将 canvas 转化为图片并支持下载
download.onclick = function () {
    var url = yyy.toDataURL("image/png")
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = 'picture.png'
    a.target = '_blank'
    a.click()
}

//  控制颜色
black.onclick = function () {
    context.strokeStyle = 'black'
    // circleColor = 'black'
    black.classList.add('active')
    red.classList.remove('active')
    green.classList.remove('active')
    blue.classList.remove('active')
    yellow.classList.remove('active')
    pink.classList.remove('active')
    purple.classList.remove('active')
}
red.onclick = function () {
    context.strokeStyle = 'red'
    // circleColor = 'red'
    black.classList.remove('active')
    red.classList.add('active')
    green.classList.remove('active')
    blue.classList.remove('active')
    yellow.classList.remove('active')
    pink.classList.remove('active')
    purple.classList.remove('active')
}
green.onclick = function () {
    context.strokeStyle = 'green'
    // circleColor = 'green'
    black.classList.remove('active')
    red.classList.remove('active')
    green.classList.add('active')
    blue.classList.remove('active')
    yellow.classList.remove('active')
    pink.classList.remove('active')
    purple.classList.remove('active')
}
blue.onclick = function () {
    context.strokeStyle = 'blue'
    // circleColor = 'blue'
    black.classList.remove('active')
    red.classList.remove('active')
    green.classList.remove('active')
    blue.classList.add('active')
    yellow.classList.remove('active')
    pink.classList.remove('active')
    purple.classList.remove('active')
}
yellow.onclick = function () {
    context.strokeStyle = 'yellow'
    // circleColor = 'yellow'
    black.classList.remove('active')
    red.classList.remove('active')
    green.classList.remove('active')
    blue.classList.remove('active')
    yellow.classList.add('active')
    pink.classList.remove('active')
    purple.classList.remove('active')
}
pink.onclick = function () {
    context.strokeStyle = '#F45A8D'
    // circleColor = '#F45A8D'
    black.classList.remove('active')
    red.classList.remove('active')
    green.classList.remove('active')
    blue.classList.remove('active')
    yellow.classList.remove('active')
    pink.classList.add('active')
    purple.classList.remove('active')
}
purple.onclick = function () {
    context.strokeStyle = 'purple'
    // circleColor = 'purple'
    black.classList.remove('active')
    red.classList.remove('active')
    green.classList.remove('active')
    blue.classList.remove('active')
    yellow.classList.remove('active')
    pink.classList.remove('active')
    purple.classList.add('active')
}

// 控制线的粗细
thin.onclick = function () {
    lineWidth = 1
    thin.classList.add('active')
    middle.classList.remove('active')
    thick.classList.remove('active')
    thickest.classList.remove('active')
}
middle.onclick = function () {
    lineWidth = 3
    thin.classList.remove('active')
    middle.classList.add('active')
    thick.classList.remove('active')
    thickest.classList.remove('active')
}
thick.onclick = function () {
    lineWidth = 8
    thin.classList.remove('active')
    middle.classList.remove('active')
    thick.classList.add('active')
    thickest.classList.remove('active')
}
thickest.onclick = function () {
    lineWidth = 12
    thin.classList.remove('active')
    middle.classList.remove('active')
    thick.classList.remove('active')
    thickest.classList.add('active')
}

/************/
function autoSetCanvasSize(canvas) {
    setCanvasSize()
    window.onresize = function () {
        setCanvasSize()
    }

    function setCanvasSize() { // 设置canvas占满整个页面
        //  获取 document 宽高度（也就是 viewport 宽高度）
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight
        canvas.width = pageWidth
        canvas.height = pageHeight
    }
}

// 用 canvas 画圈
function drawCircle(x, y, radius) {
    context.beginPath()
    context.arc(x, y, radius, 0, Math.PI * 2)
    context.fill()
    // context.fillStyle = circleColor
}

function drawLine(x1, y1, x2, y2) {
    context.beginPath()
    context.moveTo(x1, y1) //起点
    context.lineWidth = lineWidth // 取当前的线的宽度
    context.lineTo(x2, y2) //终点 
    context.lineCap = "round"; // 线段末端以圆形结束，默认是方形(butt)
    context.lineJoin = "round"; //相连部分如何连接在一起
    context.stroke()
    context.closePath()
}

function listenToUser(canvas) {

    var using = false
    var lastPoint = {
        x: undefined,
        y: undefined
    }
    // 特性检测（检测特性而不是检测设备）
    if (document.body.ontouchstart !== undefined) {
        // 触屏设备
        canvas.ontouchstart = function (aaa) {
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY
            using = true
            if (eraserEnabled) {
                context.clearRect(x - 10, y - 10, 20, 20)
            } else {
                lastPoint = {
                    "x": x,
                    "y": y
                }
                // drawCircle(x, y, lineWidth/2)
            }
        }
        canvas.ontouchmove = function (aaa) {
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY
            if (!using) {
                return
            }
            if (eraserEnabled) {
                context.clearRect(x - 10, y - 10, 20, 20)
            } else {
                var newPoint = {
                    "x": x,
                    "y": y
                }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                // drawCircle(x, y, lineWidth/2)
                lastPoint = newPoint
            }
        }
        canvas.ontouchend = function () {
            using = false
        }
    } else {
        // 非触屏设备
        canvas.onmousedown = function (aaa) {
            var x = aaa.clientX
            var y = aaa.clientY
            using = true
            if (eraserEnabled) {
                context.clearRect(x - 10, y - 10, 20, 20)
            } else {
                lastPoint = {
                    "x": x,
                    "y": y
                }
                // drawCircle(x, y, lineWidth/2)
            }
        }
        canvas.onmousemove = function (aaa) {
            var x = aaa.clientX
            var y = aaa.clientY
            if (!using) {
                return
            }
            if (eraserEnabled) {
                context.clearRect(x - 10, y - 10, 20, 20)
            } else {
                var newPoint = {
                    "x": x,
                    "y": y
                }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                // drawCircle(x, y, lineWidth/2)
                lastPoint = newPoint
            }
            /*
            if (eraserEnabled) {
              if (using) {
                context.clearRect(x - 5, y - 5, 10, 10)
              }
            } else {
              if (using) {
                var newPoint = {
                  "x": x,
                  "y": y
                }
            */
        }
        canvas.onmouseup = function (aaa) {
            using = false
        }
    }

}
