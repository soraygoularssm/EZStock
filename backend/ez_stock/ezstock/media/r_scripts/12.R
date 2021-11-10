
library("jsonlite")
library("plotly")
library("ggplot2")

##################################################################################

boors_data <- fromJSON("./boors.json")


#======================================================== analyzing 

x1 = c()
y1 = c()

for (i in 1:nrow(boors_data)+1){
  
  
  p_b_e = as.numeric(boors_data[i,17])
  name_p = toString(boors_data[i,1])
  
  if (is.na(p_b_e) == FALSE) {
    if ( (as.numeric(p_b_e) > 500) ) {
      
      x1 <- c(x1, p_b_e)
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
               marker = list(color = 'rgb(204,102,0)',
                             line = list(color = 'rgb(0,0,0)', width = 0.7)))
fig <- fig %>% layout(font = t,title = "بیشترین پی به ای ها",
                      xaxis = list(title = "نام نماد"),
                      yaxis = list(title = "P/E"))

plotly_json(fig,FALSE,FALSE)