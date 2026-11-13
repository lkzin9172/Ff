// routes/bypass.js — endpoints do bypass

const express = require('express');
const router  = express.Router();

// config principal — FF lê esse endpoint via bypass.txt
router.get('/config', (req, res) => {
  res.json({
    bypass_version: '1.0.0',
    status: 'active',
    anti_cheat: {
      enabled:           false,
      report_enabled:    false,
      hardware_check:    false,
      memory_scan:       false,
      process_scan:      false,
      integrity_check:   false,
      signature_check:   false,
      log_level:         0,
      upload_log:        false
    },
    ban_check: {
      enabled:           false,
      blacklist_sync:    false,
      hardware_ban:      false,
      account_ban:       false,
      report_flags:      0
    },
    device: {
      trusted:           true,
      whitelist_mode:    true,
      verify_signature:  false,
      root_check:        false,
      emulator_check:    false
    },
    network: {
      telemetry:         false,
      analytics:         false,
      report_session:    false,
      flag_suspicious:   false
    },
    session: {
      protected:               true,
      bypass_active:           true,
      stealth_mode:            true,
      ranked_protection:       true,
      cs_protection:           true,
      all_modes_protection:    true
    },
    rules: {
      allow_modified_memory:  true,
      allow_external_tools:   true,
      skip_integrity:         true,
      skip_ban_validation:    true,
      skip_blacklist:         true,
      skip_hardware_id:       true,
      skip_report:            true
    }
  });
});

// heartbeat — mantém conexão ativa 24h
router.get('/ping', (req, res) => {
  res.json({ alive: true, ts: Date.now() });
});

// registro de sessao — FF manda o package quando conecta
router.post('/session', (req, res) => {
  const { package: pkg, device_id } = req.body || {};
  console.log(`[session] pkg=${pkg || 'unknown'} device=${device_id || 'unknown'}`);
  res.json({
    session_id:  Math.random().toString(36).slice(2),
    protected:   true,
    bypass:      true,
    expires:     Date.now() + 86400000  // 24h
  });
});

module.exports = router;
