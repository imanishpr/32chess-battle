<template>
  <div>
    <div class="infoBox">
      <div className={styles.name}>{this.props.home.data[this.props.match.params.eventId].eventName}</div>
      <div className={styles.place}>{this.props.home.data[this.props.match.params.eventId].eventVenue}</div>
      <div className={styles.timings}>
        {edpTime(this.props.home.data[this.props.match.params.eventId].date)}, &nbsp;
        {this.props.home.data[this.props.match.params.eventId].timings}
      </div>
      <div className={styles.payableAmount}>
        {' '}
        Total Payable Amount :{' '}
        <span className={styles.money}>
          <sup className={styles.rupee}>&#8377;</sup>
          {this.calc()}
        </span>{' '}
      </div>
    </div>
    <div className={styles.userInfo}>
      <div className={styles.userEmail}>{this.renderEmailField()} </div>
      <div className={styles.userPhone}>{this.renderPhoneField()} </div>
    </div>
    <div>
</template>
<script>
import { getPaymentStatusById } from '@/utils/functions'
export default {
  name: 'Payments',
  data () {
    return {
      status: 'not',
      txn: ''
    }
  },
  beforeMount () {
  },
  mounted () {
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
