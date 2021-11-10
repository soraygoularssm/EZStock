
library("jsonlite")
library("plotly")
# library("ggplot2")

##################################################################################

boors_data <- fromJSON("./boors.json")



#======================================================== analyze


x1 = c()
y1 = c()

x1_afzayeshi = c()
y1_afzayeshi = c()

for (i in 1:nrow(boors_data)+1){

  qeymat_dirooz = as.numeric(boors_data[i,6])
  qeymat_alan = as.numeric(boors_data[i,8])
  
  name_p = toString(boors_data[i,1])

  
  if ((is.na(qeymat_alan) == FALSE)& (is.na(qeymat_dirooz) == FALSE)) {
    if (( (as.numeric(qeymat_alan)) > (as.numeric(qeymat_dirooz)) )) {
      
      
      darsad_afzayesh <-  (((as.numeric(qeymat_alan) -as.numeric(qeymat_dirooz) ) / (as.numeric(qeymat_alan))) * 100)
      
      if ( (as.numeric(darsad_afzayesh) < 20) & (as.numeric(darsad_afzayesh) > 1) ) {
        
        
        
        x1_afzayeshi <- c(x1_afzayeshi, round(darsad_afzayesh))
        y1_afzayeshi <- c(y1_afzayeshi, name_p)
        
      }
    }
  } 
}

#============================================================================= Chart



x <- y1_afzayeshi
y <- x1_afzayeshi

t <- list(
  family = "B Nazanin",
  size = 15,
  color = 'black')

fig <- plot_ly(x = ~y1_afzayeshi, y = ~x1_afzayeshi, type = 'bar',
               text = y, textposition = 'auto',
               marker = list(color = 'rgb(255, 204, 102)',
                             line = list(color = 'rgb(0,0,0)', width = 0.3)))
fig <- fig %>% layout(font = t,title = "سهم هایی که نسبت به روز قبل افزایش 1 تا 20 درصدی قیمت داشته اند",
                      xaxis = list(title = "نام نماد ها"),
                      yaxis = list(title = "درصد افزایش"))

plotly_json(fig,FALSE,FALSE)