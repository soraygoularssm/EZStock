
library("jsonlite")
library("plotly")
# library("ggplot2")

##################################################################################

boors_data <- fromJSON("./boors.json")

#======================================================== analyzing

x1 = c()
y1 = c()
for (i in 1:nrow(boors_data)+1){
  
  low_p = as.numeric(boors_data[i,14])
  high_p = as.numeric(boors_data[i,15])
  change_p = ((high_p - low_p)/low_p) *100
  name_p = toString(boors_data[i,1])
  
  if (is.na(change_p) == FALSE) {
    if ( (as.numeric(change_p) < 20) & (as.numeric(change_p) > 0) ) {
      
      x1 <- c(x1, round(change_p))
      y1 <- c(y1, name_p)
    }
    
  } 
} 

#======================================================== histogram

t <- list(
  family = "B Nazanin",
  size = 14,
  color = 'black')



fig <- plot_ly(alpha = 0.6)
fig <- fig %>% add_histogram(x = x1)

fig <- fig %>% layout(font = t ,title = 'نمودار پراکندگی سهم ها در هر بازه تغییرات قیمت',barmode = "overlay",
                      xaxis = list(title = "درصد تغییرات قیمت"),
                      yaxis = list(title = "تعداد نماد ها"))

plotly_json(fig,FALSE,FALSE)