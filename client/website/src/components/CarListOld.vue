<template>
  <div class="carList">


    <div class="list-div">
      <a-row justify="left" align="middle">
        <a-col :span="24" class="list-item-margin">
          <a-button size="large" @click="funcBuyCar">Buying Cars</a-button>
        </a-col>
      </a-row>

      <a-row v-if="userCarList.length" justify="left" align="middle">
        <a-col :span="2"><h3>URL</h3></a-col>
        <a-col :span="1"><h3>ID</h3></a-col>
        <a-col :span="3"><h3>Parking Address</h3></a-col>
        <a-col :span="2"><h3>Prospective Earnings</h3></a-col>
        <a-col :span="3"><h3>operation</h3></a-col>

        <a-col :offset="2" :span="2"><h3>URL</h3></a-col>
        <a-col :span="1"><h3>ID</h3></a-col>
        <a-col :span="3"><h3>Parking Address</h3></a-col>
        <a-col :span="2"><h3>Prospective Earnings</h3></a-col>
        <a-col :span="3"><h3>operation</h3></a-col>
      </a-row>
      <a-row align="middle">

        <a-col v-for="(item,index) in userCarList" :span="12">
          <a-row>
            <a-col v-if="index%2===1" :span="1" class="list-item-margin">
            </a-col>

            <a-col :span="4" class="list-item-margin">
              <a-row justify="space-around" align="middle">
                <a-col :span="20">
                  <!--//TODO:静态图片-->
                  <div class="car-img">
                    <a-image width="50px" height="73" :src="require('../assets/car.jpg')" :preview="false"/>
                  </div>
                </a-col>
              </a-row>
            </a-col>
            <a-col :span="2" class="list-item-margin list-item-text-align">
              <h3>{{ item.ID }}</h3>
            </a-col>
            <a-col :span="6" class="list-item-margin list-item-text-align">
              <h4>{{ item.ParkingAddress }}</h4>
            </a-col>
            <a-col :span="4" class="list-item-margin list-item-text-align">
              <h4>{{ item.ProspectiveEarnings }}</h4>
            </a-col>
            <a-col :span="4">
              <a-button v-if="item.ParkingAddress===null" size="large" type="primary" danger>升级</a-button>
              <a-button v-else size="large" type="primary">离开</a-button>
              <!--            <a-button   icon="delete"-->
              <!--                      @click="buttonDeleteList(index,'learn')"/>-->
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";

export default defineComponent({
  name: "CarListOld",
  setup() {
    const userCarStateList = ref([2, 1, 1, 1]); // 0表示未mint 1表示空闲 2表示停放

    const userCarList = ref(
        [{"URL": "0", "ID": "741", "ParkingAddress": "0x123...456", "ProspectiveEarnings": "16.001"},
          {"URL": "0", "ID": "852", "ParkingAddress": null, "ProspectiveEarnings": "0"},
          {"URL": "0", "ID": "963", "ParkingAddress": "0x666...8AB", "ProspectiveEarnings": "8.001"},
          {"URL": "0", "ID": "147", "ParkingAddress": "0x666...8AB", "ProspectiveEarnings": "7.369"},
          {"URL": "0", "ID": "258", "ParkingAddress": null, "ProspectiveEarnings": "0"},]
    );

    // const userCarList = ref([]);

    const funcFreeMintCar = (index: number) => {
      userCarStateList.value[index] = 1;
    };

    const funcBuyCar = () => {
    };

    return {
      userCarList,
      userCarStateList,
      funcFreeMintCar,
      funcBuyCar
    };
  },
});
</script>

<style scoped>

.list-div {
  padding: 0.5rem;
  margin-top: 0.5rem;
  margin-left: 1rem;
  margin-right: 1rem;
  border-radius: 0.5rem;
  box-sizing: content-box;
  border: 2px solid #8ce6b0;
  background-color: #edfff3;
  /*border: 1px solid black;*/
  /*background-color: #9fe080;*/
}

.list-item-margin {
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 10px;
}

.list-item-text-align {
  text-align: left;
}

.car-img {
  border: 1px solid #abdcff;
  border-radius: 0.5rem;
  box-sizing: content-box;
  background-color: #f0faff;
}


.car-0 {
  border: 1px solid #8ce6b0;
  border-radius: 0.5rem;
  height: 8rem;
  box-sizing: content-box;
  background-color: #edfff3;
}

.car-1 {
  border: 1px solid #abdcff;
  border-radius: 0.5rem;
  height: 8rem;
  box-sizing: content-box;
  background-color: #f0faff;
}

.car-2 {
  border: 1px solid #ffd77a;
  border-radius: 0.5rem;
  height: 8rem;
  box-sizing: content-box;
  background-color: #fff9e6;
}

.carMargin {
  margin: 0.25rem 0.5rem;
}

.test01 {
  background-color: red;
}
</style>
