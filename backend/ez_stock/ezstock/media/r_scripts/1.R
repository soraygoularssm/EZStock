
library("jsonlite")
library("plotly")
# library("ggplot2")

##################################################################################

boors_data <- fromJSON("./boors.json")


#======================================================== analyzing 1
x1 = c()
y1 = c()
for (i in 1:nrow(boors_data)+1){
  
  
  last_percent = as.numeric(boors_data[i,10])
  name_p = toString(boors_data[i,1])
  
  if (is.na(last_percent) == FALSE) {
    if ( (as.numeric(last_percent) < 20) & (as.numeric(last_percent) > -20) ) {
      
      x1 <- c(x1, last_percent)
      y1 <- c(y1, name_p)
    }
    
  } 
} 

#======================================================== analyzing 2

x1_negative = c()
x1_positive = c()
x1_zero = c()
y1_negative = c()
y1_positive = c()
y1_zero = c()

for (i in 1:length(x1)){
  
  if (x1[i] > 0) {
    x1_positive <- c(x1_positive, x1[i])
    y1_positive <- c(y1_positive, y1[i])
  }
  
  if (x1[i] < 0) {
    x1_negative <- c(x1_negative, x1[i])
    y1_negative <- c(y1_negative, y1[i])
    
  }
  if (x1[i] == 0) {
    x1_zero <- c(x1_zero, x1[i])
    y1_zero <- c(y1_zero, y1[i])
    
  }
  
}


#======================================================== pie chart


# length(x1)
# length(x1_positive)
# length(x1_negative)
# length(x1_zero)


t <- list(
  family = "B Nazanin",
  size = 14,
  color = 'black')


a = 'سهم های مثبت'
b = 'سهم های صفر یا بسته'
c = 'سهم های منفی'

labels = c(a , b , c)
values = c(length(x1_positive), length(x1_zero), length(x1_negative))

fig <- plot_ly(type='pie', labels=labels, values=values, 
               #textinfo='label+percent',
               insidetextorientation='radial')
fig <- fig %>% layout(font = t,title = "نمایی از کل بازار")

plotly_json(fig,FALSE,FALSE)