
library("jsonlite")
library("plotly")
library("ggplot2")

##################################################################################

boors_data <- fromJSON("./boors.json")

#======================================================== kamtar az vagheyi

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
      
      
      kamtar_az_vagheyi <- (((real_price - current_price) / real_price) *100)
      
      if (kamtar_az_vagheyi > 5) {
        
        
        
        
        
        x1 <- c(x1, kamtar_az_vagheyi)
        y1 <- c(y1, name_p)
        
        
        
        
      }
      
    }
    
  } 
} 

#======================================================== bishtar az vagheyi

x2 = c()
y2 = c()
for (i in 3:nrow(boors_data)+1){
  
  
  P_per_E = as.numeric(boors_data[i,17])
  EPS = as.numeric(boors_data[i,16])
  current_price = as.numeric(boors_data[i,8])
  name_p = toString(boors_data[i,1])
  
  
  if ((is.na(P_per_E) == FALSE) & (is.na(EPS) == FALSE) & (is.na(current_price) == FALSE)) {
    
    real_price <- (P_per_E * EPS)
    
    
    
    if ((real_price < current_price)) {
      
      
      bishtar_az_vagheyi <- (((current_price - real_price) / current_price) *100)
      
      if ((bishtar_az_vagheyi > 1) &(bishtar_az_vagheyi < 50) ) {
        
        
        
        
        
        x2 <- c(x2, bishtar_az_vagheyi)
        y2 <- c(y2, name_p)
        
        
        
        
      }
      
    }
    
  } 
} 

#======================================================== kole availbe ha



x3 = c()
y3 = c()
for (i in 3:nrow(boors_data)+1){
  
  
  P_per_E = as.numeric(boors_data[i,17])
  EPS = as.numeric(boors_data[i,16])
  current_price = as.numeric(boors_data[i,8])
  name_p = toString(boors_data[i,1])
  
  
  if ((is.na(P_per_E) == FALSE) & (is.na(EPS) == FALSE) & (is.na(current_price) == FALSE)) {
    
    real_price <- (P_per_E * EPS)
    
    

        kolll <- (((real_price - current_price) / real_price) *100)
    
        
        x3 <- c(x3, kolll)
        y3 <- c(y3, name_p)
        
        
        
        
    
      
    }
    
  } 
 



#======================================================== Chart

kole_data <- c(length(x1),length(x2),length(x3))

t <- list(
  family = "B Nazanin",
  size = 14,
  color = 'black')

a = 'سهم های زیر قیمت واقعی'
b = 'سهم های بالای قیمت واقعی'
c = 'سهم های متعادل'

labels = c(a , b , c)
values = c(length(x1), length(x2), length(x3))

fig <- plot_ly(type='pie', labels=labels, values=values, 
               #textinfo='label+percent',
               insidetextorientation='radial')
fig <- fig %>% layout(font = t,title = "نمایی از کل بازار")

plotly_json(fig,FALSE,FALSE)