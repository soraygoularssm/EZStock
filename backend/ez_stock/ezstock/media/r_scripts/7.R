
library("jsonlite")
library("plotly")
# library("ggplot2")

##################################################################################

boors_data <- fromJSON("./boors.json")



#======================================================== analyze


x1 = c()
y1 = c()

x1_kaheshi = c()
y1_kaheshi = c()

for (i in 1:nrow(boors_data)+1){
  
  
  qeymat_dirooz = as.numeric(boors_data[i,6])
  qeymat_alan = as.numeric(boors_data[i,8])
  
  name_p = toString(boors_data[i,1])
  
  if ((is.na(qeymat_alan) == FALSE)& (is.na(qeymat_dirooz) == FALSE)) {
    if (( (as.numeric(qeymat_alan)) < (as.numeric(qeymat_dirooz)) )) {
      
      
      darsad_kahesh <-  abs(((as.numeric(qeymat_alan) -as.numeric(qeymat_dirooz) ) / (as.numeric(qeymat_alan))) * 100)
      
      if ( (as.numeric(darsad_kahesh) < 20) & (as.numeric(darsad_kahesh) > 1) ) {
        
        
        
        x1_kaheshi <- c(x1_kaheshi, round(darsad_kahesh))
        y1_kaheshi <- c(y1_kaheshi, name_p)
        
      }
    }
  } 
} 

# x1_kaheshi
# y1_kaheshi

# length(x1_kaheshi)
# length(y1_kaheshi)




#============================================================================= Chart



x <- x1_kaheshi
y <- y1_kaheshi




t <- list(
  family = "B Nazanin",
  size = 15,
  color = 'black')

fig <- plot_ly(x = ~y1_kaheshi, y = ~x1_kaheshi, type = 'bar',
               text = y, textposition = 'auto',
               marker = list(color = 'rgb(51, 204, 204)',
                             line = list(color = 'rgb(0,0,0)', width = 0.3)))
fig <- fig %>% layout(font = t,title = "سهم هایی که نسبت به روز قبل کاهش 1 تا 20 درصدی قیمت داشته اند",
                      xaxis = list(title = "نام نماد ها"),
                      yaxis = list(title = "درصد کاهش"))

plotly_json(fig,FALSE,FALSE)