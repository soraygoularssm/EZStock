
library("jsonlite")
library("plotly")
library("ggplot2")

##################################################################################

boors_data <- fromJSON("./boors.json")


#======================================================== analyzing 

x1 = c()
y1 = c()

for (i in 1:nrow(boors_data)+1){
  
  
  EPS = as.numeric(boors_data[i,16])
  name_p = toString(boors_data[i,1])
  
  if (is.na(EPS) == FALSE) {
    if ( (as.numeric(EPS) > 3000) ) {
      
      x1 <- c(x1, EPS)
      y1 <- c(y1, name_p)
    
    }
  } 
} 

#======================================================== analyzing 


x <- y1
y <- x1

data <- data.frame(y1, x1)


t <- list(
  family = "B Nazanin",
  size = 14,
  color = 'black')


fig <- plot_ly(data, x = ~y1, y = ~x1, type = 'bar',
               text = y, textposition = 'auto',
               marker = list(color = 'rgb(153,153,0)',
                             line = list(color = 'rgb(0,0,0)', width = 0.7)))
fig <- fig %>% layout(font = t,title = "سهم های دارای ای پی اس بالای 3000 ریال",
                      xaxis = list(title = "نام نماد"),
                      yaxis = list(title = "EPS"))

plotly_json(fig,FALSE,FALSE)