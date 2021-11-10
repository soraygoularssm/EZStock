
library("jsonlite")
library("plotly")
library("ggplot2")

##################################################################################

boors_data <- fromJSON("./boors.json")

#======================================================== analyzing 1

x1 = c()
y1 = c()

for (i in 1:nrow(boors_data)+1){
  
  P_per_E = as.numeric(boors_data[i,17])
  EPS = as.numeric(boors_data[i,16])
  current_price = as.numeric(boors_data[i,8])
  name_p = toString(boors_data[i,1])

  
  
  if ((is.na(P_per_E) == FALSE) & (is.na(EPS) == FALSE) & (is.na(current_price) == FALSE)) {
    
      real_price <- (P_per_E * EPS)

      
      
      if ((current_price < real_price)) {
        
        
          darsad_sood_dehi <- (((real_price - current_price) / real_price) *100)
            
            if (darsad_sood_dehi > 5) {
              
              
              
              
              
              x1 <- c(x1, darsad_sood_dehi)
              y1 <- c(y1, name_p)
              
              
              
              
            }

    }
    
  } 
} 


#======================================================== Chart

x <- y1
y <- x1

data <- data.frame(y1, x1)


t <- list(
  family = "B Nazanin",
  size = 14,
  color = 'black')


fig <- plot_ly(data, x = ~y1, y = ~x1, type = 'bar',
               text = y, textposition = 'auto',
               marker = list(color = 'rgb(148, 208, 211)',
                             line = list(color = 'rgb(0,0,0)', width = 0.5)))
fig <- fig %>% layout(font = t,title = "سهم هایی که قیمت کنونی آنها کمتر از قیمت واقعی انهاست",
                      xaxis = list(title = "نام نماد"),
                      yaxis = list(title = "درصد سود دهی"))

plotly_json(fig,FALSE,FALSE)
