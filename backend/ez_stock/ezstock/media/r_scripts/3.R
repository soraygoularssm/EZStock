
library("jsonlite")
library("plotly")
# library("ggplot2")

##################################################################################

boors_data <- fromJSON("./boors.json")


#======================================================== analyzing 

x1 = c()
y1 = c()


for (i in 1:nrow(boors_data)+1){
  
  
tedad_kharid = as.numeric(boors_data[i,18])
tedad_foroosh = as.numeric(boors_data[i,23])
  
  name_p = toString(boors_data[i,1])
  
  if ((is.na(tedad_kharid) == FALSE)&(is.na(tedad_foroosh) == FALSE)) {
    if ( (as.numeric(tedad_kharid) == 0) & (as.numeric(tedad_foroosh) > 100) ) {
      
      x1 <- c(x1, tedad_foroosh)
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
               marker = list(color = 'rgb(255,0,0)',
                             line = list(color = 'rgb(0,0,0)', width = 0.2)))
fig <- fig %>% layout(font = t,title = "صف های فروش",
                      xaxis = list(title = "نام نماد"),
                      yaxis = list(title = "تعداد "))

plotly_json(fig,FALSE,FALSE)