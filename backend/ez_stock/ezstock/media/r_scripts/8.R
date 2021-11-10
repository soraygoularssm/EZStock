
library("jsonlite")
library("plotly")
# library("ggplot2")

##################################################################################

boors_data <- fromJSON("./boors.json")

#======================================================== analyze
x1 = c()
y1 = c()
for (i in 1:nrow(boors_data)+1){
  
  low_p = as.numeric(boors_data[i,14])
  high_p = as.numeric(boors_data[i,15])
  change_p = ((high_p - low_p)/low_p) *100
  name_p = toString(boors_data[i,1])
  
  if (is.na(change_p) == FALSE) {
    if ( (as.numeric(change_p) < 20) & (as.numeric(change_p) > 10) ) {
      
      x1 <- c(x1, round(change_p))
      y1 <- c(y1, name_p)
    }
    
  } 
} 



#======================================================== Advance bar chart


x <- y1
y <- x1

data <- data.frame(y1, x1)


t <- list(
  family = "B Nazanin",
  size = 11,
  color = 'black')


fig <- plot_ly(data, x = ~y1, y = ~x1, type = 'bar',
               text = y, textposition = 'auto',
               marker = list(color = 'rgb(153, 102, 255)',
                             line = list(color = 'rgb(0,0,0)', width = 0.8)))
fig <- fig %>% layout(font = t,title = "سهم هایی که بین 10 تا 20 درصد تغییرات قیمتی داشته اند",
                      xaxis = list(title = "نام نماد"),
                      yaxis = list(title = "درصد تغییر قیمت"))

plotly_json(fig,FALSE,FALSE)