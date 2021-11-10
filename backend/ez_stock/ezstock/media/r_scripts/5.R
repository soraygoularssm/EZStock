
library("jsonlite")
library("plotly")
# library("ggplot2")

##################################################################################

boors_data <- fromJSON("./boors.json")


#======================================================== analyzing 

x1 = c()
y1 = c()
for (i in 1:nrow(boors_data)+1){
  
  
  hajm_fooroosh = as.numeric(boors_data[i,22])
  name_p = toString(boors_data[i,1])
  
  if (is.na(hajm_fooroosh) == FALSE) {
    if ( (as.numeric(hajm_fooroosh) > 50000000) ) {
      
      x1 <- c(x1, hajm_fooroosh)
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
               marker = list(color = 'rgb(255, 0, 0)',
                             line = list(color = 'rgb(0,0,0)', width = 1.5)))
fig <- fig %>% layout(font = t,title = "سهم های با حجم فروش بیش از 50 میلیون",
                      xaxis = list(title = "نام نماد ها"),
                      yaxis = list(title = "حجم صف"))

plotly_json(fig,FALSE,FALSE)